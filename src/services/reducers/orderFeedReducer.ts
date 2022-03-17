import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../constants/webSocketStatus';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/wsActions';
import { OrderStatusEnum } from '../../constants/orderStatusEnum';

interface IOrder {
  _id: string,
  ingredients: string[],
  status: OrderStatusEnum,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}

export interface IOrderFeed {
  success: boolean,
  total: number,
  totalToday: number,
  orders: IOrder[]
}

interface IOrderFeedState {
  wsStatus: WebsocketStatus
  connectionError: string,
  data: IOrderFeed,
}

const initialState: IOrderFeedState = {
  wsStatus: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  },
};

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.wsStatus = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.wsStatus = WebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, () => {
      return {...initialState};
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = action.payload;
    })
});
