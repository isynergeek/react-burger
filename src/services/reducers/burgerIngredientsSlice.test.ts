import reducer, { SET_CURRENT_TAB } from './burgerIngredientsSlice';
import { AnyAction } from 'redux';
import { IngredientType } from '../../constants/ingredientType';
import { getItems } from '../actions/burgerIngredients';

const ingredient = {
  calories: 100,
  carbohydrates: 100,
  fat: 100,
  image: 'http://test.com/test.jpg',
  image_large: 'http://test.com/test.jpg',
  image_mobile: 'http://test.com/test.jpg',
  name: 'test',
  price: 1000,
  proteins: 100,
  type: 'sauce',
  __v: 1,
  _id: '1',
};

const initialState = {
  items: [],
  itemsRequest: false,
  itemsError: false,
  itemsErrorMessage: '',

  currentTab: IngredientType.BUN
};

describe('Test BurgerIngredientsSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {} as AnyAction))
      .toEqual(initialState);
  });

  it('should set current tab', () => {
    expect(reducer(initialState, SET_CURRENT_TAB(IngredientType.MAIN)))
      .toEqual({
        items: [],
        itemsRequest: false,
        itemsError: false,
        itemsErrorMessage: '',
        currentTab: IngredientType.MAIN
      });
  });

  it('should get ingredients on pending', () => {
    expect(reducer(initialState, getItems.pending))
      .toEqual(
        {
          ...initialState,
          itemsRequest: true,
          itemsError: false,
          itemsErrorMessage: '',
        }
      );
  });

  it('should get ingredients on fulfilled', () => {
    const action = {
      type: getItems.fulfilled.type, payload: {
        data: [ingredient]
      }
    };

    expect(reducer(initialState, action))
      .toEqual(
        {
          ...initialState,
          items: [{ ...ingredient }],
          itemsRequest: false,
        }
      );
  });

  it('should get ingredients on rejected', () => {

    const action = {
      type: getItems.rejected,
      error: {
        message: 'Test error',
      },
    };

    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        itemsRequest: false,
        itemsError: true,
        itemsErrorMessage: 'Test error',
      });
  });
});
