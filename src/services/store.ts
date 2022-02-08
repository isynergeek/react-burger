import { configureStore } from '@reduxjs/toolkit'
import burgerIngredientsReducer from "./reducers/burgerIngredientsSlice";
import ingredientDetailsReducer from './reducers/ingredientDetailsSlice';
import orderDetailsReducer from './reducers/orderDetailsSlice';
import burgerConstructorReducer  from './reducers/burgerConstructorSlice';
import userProfileReducer from './reducers/userProfileSlice';

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    userProfile: userProfileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
