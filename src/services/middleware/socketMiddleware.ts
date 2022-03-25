import { Middleware } from 'redux';
import { RootState, wsActions } from '../store';

type TwsActionTypes = typeof wsActions;

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<Record<string, unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const { wsConnect, wsConnecting, wsOpen, wsError, wsClose, wsDisconnect, wsMessage, wsSendMessage } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => dispatch(wsOpen());
        socket.onerror = (err) => {
          console.error(err);
          dispatch(wsError('Socket error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }

          dispatch(wsClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(wsClose());
        }
      }

      next(action);
    };
  };
};
