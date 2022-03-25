import { createAction } from '@reduxjs/toolkit';
import { WS_CLOSE, WS_CONNECT, WS_CONNECTING, WS_DISCONNECT, WS_ERROR, WS_MESSAGE, WS_OPEN, WS_SEND_MESSAGE } from '../action-types';
import { IOrderFeed } from '../reducers/orderFeedReducer';

export const wsConnect = createAction<string>(WS_CONNECT);
export const wsDisconnect = createAction(WS_DISCONNECT);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsOpen = createAction(WS_OPEN);
export const wsClose = createAction(WS_CLOSE);
export const wsError = createAction<string>(WS_ERROR);
export const wsMessage = createAction<IOrderFeed, typeof WS_MESSAGE>(WS_MESSAGE);
export const wsSendMessage = createAction<unknown, typeof WS_SEND_MESSAGE>(WS_SEND_MESSAGE);

