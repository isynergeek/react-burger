import reducer, {
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  SET_INGREDIENTS,
  IBurgerConstructorState
} from './burgerConstructorSlice';
import { AnyAction } from 'redux';

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
const bun = {
  calories: 100,
  carbohydrates: 100,
  fat: 100,
  image: 'http://test.com/test.jpg',
  image_large: 'http://test.com/test.jpg',
  image_mobile: 'http://test.com/test.jpg',
  name: 'test',
  price: 1000,
  proteins: 100,
  type: 'bun',
  __v: 1,
  _id: '1',
};

const initialState: IBurgerConstructorState = {
  bun: null,
  items: [],
  orderPrice: 0
};

describe('Test BurgerConstructorSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction))
      .toEqual({
        bun: null,
        items: [],
        orderPrice: 0,
      });
  });

  it('should add ingredient', () => {
    expect(reducer(initialState, ADD_INGREDIENT(ingredient)))
      .toEqual({
        bun: null,
        items: [{ ...ingredient, appId: expect.any(String) }],
        orderPrice: 1000
      });
  });

  it('should add bun', () => {
    expect(reducer(initialState, ADD_BUN(bun)))
      .toEqual({
        bun: { ...bun },
        orderPrice: bun.price * 2,
        items: []
      });
  });

  it('should remove ingredient', () => {
    expect(reducer({...initialState, items: [{...ingredient, appId: 'testId'}]}, REMOVE_INGREDIENT('testId')))
      .toEqual({
        bun: null,
        items: [],
        orderPrice: 0,
      });
  });

  it('should clear constructor', () => {
    expect(reducer({...initialState, items: [{...ingredient, appId: 'testId'}]}, CLEAR_CONSTRUCTOR())).toEqual(initialState);
  });

  it('should set ingredients', () => {
    const ingredients = [
      {
        appId: 'testId1',
       ...ingredient,
      },
      {
        appId: 'testId2',
        ...ingredient,
      },
    ];
    expect(reducer(initialState, SET_INGREDIENTS(ingredients))).toEqual({
      bun: null,
      items: ingredients,
      orderPrice: 0,
    })
  });
});
