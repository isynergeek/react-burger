import { orderFeedReducer } from './orderFeedReducer';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/wsActions';
import { WebsocketStatus } from '../../constants/webSocketStatus';
import { AnyAction } from 'redux';
import { OrderStatusEnum } from '../../constants/orderStatusEnum';

const initialState = {
  wsStatus: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  }
};

describe('Test OrderFeedReducer', () => {
  it('should return initial state', () => {
    expect(orderFeedReducer(undefined, {} as AnyAction))
      .toEqual({ ...initialState });
  });

  it('should set WS connecting state', () => {
    expect(orderFeedReducer(initialState, wsConnecting))
      .toEqual({
        ...initialState,
        wsStatus: WebsocketStatus.CONNECTING
      });
  });

  it('should set WS open state', () => {
    expect(orderFeedReducer(initialState, wsOpen))
      .toEqual({
        ...initialState,
        wsStatus: WebsocketStatus.ONLINE
      });
  });

  it('should set WS close state', () => {
    expect(orderFeedReducer(initialState, wsClose))
      .toEqual({
        ...initialState,
      });
  });

  it('should set WS close state', () => {
    expect(orderFeedReducer(initialState, wsError('Error test')))
      .toEqual({
        ...initialState,
        connectionError: 'Error test'
      });
  });

  it('should set WS get message state', () => {
    const message = {
      success: true,
      total: 100,
      totalToday: 1,
      orders: [
        {
          _id: 'testId',
          ingredients: ['ing1', 'ing2', 'ing3'],
          status: OrderStatusEnum.DONE,
          name: 'test',
          createdAt: 'test',
          updatedAt: 'test',
          number: 1
        }
      ],

    };

    expect(orderFeedReducer(initialState, wsMessage(message)))
      .toEqual({
        ...initialState,
        data: {...message},
      });
  });
});
