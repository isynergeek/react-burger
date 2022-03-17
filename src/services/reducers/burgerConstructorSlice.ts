import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient, IRawIngredient } from './burgerIngredientsSlice';

export interface IBurgerConstructorState {
  bun: IRawIngredient | null,
  items: IIngredient[],
  orderPrice: number,
}

const initialState: IBurgerConstructorState = {
  bun: null,
  items: [],
  orderPrice: 0,
};

const calculatePrice = ({ items, bun }: { items: IIngredient[], bun: IRawIngredient | null }): number => {
  const bunPrice = bun?.price || 0;
  const itemPriceTotal = items.reduce<number>((acc: number, current: IIngredient) => acc + current.price, 0);
  return itemPriceTotal + bunPrice * 2;
};

export const burgerConstructorSlice = createSlice({
  name: 'BURGER_CONSTRUCTOR',
  initialState,
  reducers: {
    ['CALC_PRICE'](state) {
      state.orderPrice = calculatePrice({ items: state.items, bun: state.bun });
    },
    ['ADD_INGREDIENT'](state, action: PayloadAction<IRawIngredient>) {
      const item = { ...action.payload, appId: nanoid() };
      state.items = [...state.items, item];
      burgerConstructorSlice.caseReducers.CALC_PRICE(state);
    },
    ['REMOVE_INGREDIENT'](state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.appId !== action.payload);
      burgerConstructorSlice.caseReducers.CALC_PRICE(state);
    },
    ['ADD_BUN'](state, action: PayloadAction<IRawIngredient>) {
      state.bun = { ...action.payload };
      burgerConstructorSlice.caseReducers.CALC_PRICE(state);
    },
    ['SET_INGREDIENTS'](state, action: PayloadAction<IIngredient[]>) {
      state.items = action.payload;
    },
    ['CLEAR_CONSTRUCTOR']() {
      return { ...initialState };
    }
  }
});

export const { ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT, CLEAR_CONSTRUCTOR, SET_INGREDIENTS } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
