import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from '../actions/orderDetails';

interface IOrderDetailsState {
  orderNumRequest: boolean,
  orderNumError: boolean,
  orderNumErrorMessage: string
  orderNum: number;
}

const initialState: IOrderDetailsState = {
  orderNumRequest: false,
  orderNumError: false,
  orderNumErrorMessage: '',
  orderNum: 0
};

export const orderDetailsSlice = createSlice({
  name: 'INGREDIENT_DETAILS',
  initialState,
  reducers: {
    ['CLEAR_ORDER']() {
      return {...initialState};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
      state.orderNumRequest = true;
      state.orderNumError = false;
      state.orderNum = 0;
    })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderNumRequest = false;
        state.orderNum = action.payload.order.number;
      })
      .addCase(makeOrder.rejected, (state, action)=> {
        state.orderNumRequest = false;
        state.orderNumError = true;
        state.orderNumErrorMessage = action.error.message || 'Ошибка получения заказа';
        state.orderNum = 0;
      })
  }
});

export const {CLEAR_ORDER} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
