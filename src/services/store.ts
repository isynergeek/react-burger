import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from './reducers/burgerIngredientsSlice';
import ingredientDetailsReducer from './reducers/ingredientDetailsSlice';
import orderDetailsReducer from './reducers/orderDetailsSlice';
import burgerConstructorReducer from './reducers/burgerConstructorSlice';
import userProfileReducer from './reducers/userProfileSlice';
import {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  wsSendMessage,
} from './actions/wsActions';

import { socketMiddleware } from './middleware';
import { orderFeedReducer } from './reducers/orderFeedReducer';

export const wsActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  wsSendMessage,
};

const wsMiddleware = socketMiddleware(wsActions);

const rootReducer = combineReducers( {
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  userProfile: userProfileReducer,
  orderFeed: orderFeedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(wsMiddleware);
  }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
