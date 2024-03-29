import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../constants/ingredientType';
import { getItems } from '../actions/burgerIngredients';

export interface IRawIngredient {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string,
}

export interface IIngredient extends IRawIngredient {
  appId: string;
}

export interface IBurgerIngredientsState {
  items: IRawIngredient[],
  itemsRequest: boolean,
  itemsError: boolean,
  itemsErrorMessage: string | undefined
  currentTab: IngredientType
}

const initialState: IBurgerIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsError: false,
  itemsErrorMessage: '',

  currentTab: IngredientType.BUN
};

export const burgerIngredientsSlice = createSlice({
  name: 'BURGER_INGREDIENTS',
  initialState,
  reducers: {
    ['SET_CURRENT_TAB'](state, action: PayloadAction<IngredientType>) {
      if (state.currentTab !== action.payload) {
        state.currentTab = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.itemsRequest = true;
        state.itemsError = false;
        state.itemsErrorMessage = '';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.itemsRequest = false;
        state.items = action.payload.data;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.itemsRequest = false;
        state.items = [];
        state.itemsError = true;
        state.itemsErrorMessage = action.error?.message;
      });
  }
});

export const { SET_CURRENT_TAB } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
