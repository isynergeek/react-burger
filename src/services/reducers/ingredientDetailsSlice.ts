import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IIngredientDetailsState {
  _id: string,
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  name: string,
  proteins: number,
}

const initialState: IIngredientDetailsState = {
  _id: '',
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  name: '',
  proteins: 0
};

export const ingredientDetailsSlice = createSlice({
  name: 'INGREDIENT_DETAILS',
  initialState,
  reducers: {
    ['SET_DETAILS'](state, action: PayloadAction<IIngredientDetailsState>) {
        return action.payload;
    },
    ['REMOVE_DETAILS']() {
      return { ...initialState };
    }
  }
});

export const {SET_DETAILS, REMOVE_DETAILS} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
