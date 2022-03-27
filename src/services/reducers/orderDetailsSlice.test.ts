import reducer, { CLEAR_ORDER } from './orderDetailsSlice';
import { AnyAction } from 'redux';
import { makeOrder } from '../actions/orderDetails';

const initialState = {
  orderNumRequest: false,
  orderNumError: false,
  orderNumErrorMessage: '',
  orderNum: 0
};

describe('Test OrderDetailsSlice ', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {} as AnyAction))
      .toEqual({
        ...initialState
      });
  });

  it('should make order on pending', () => {
    const action = {
      type: makeOrder.pending.type
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        orderNumRequest: true,
        orderNumError: false,
        orderNum: 0,
      });
  });

  it('should make order on fulfilled', () => {
    const action = {
      type: makeOrder.fulfilled.type,
      payload: {
        order: {
          number: 100
        }
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        orderNumRequest: false,
        orderNum: 100,
      });
  });

  it('should make order on rejected', () => {
    const action = {
      type: makeOrder.rejected.type,
      error: {
        message: 'Test error'
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        orderNumRequest: false,
        orderNumError: true,
        orderNumErrorMessage: 'Test error',
        orderNum: 0,
      });
  });
});

