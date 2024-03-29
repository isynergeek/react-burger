import reducer, {SET_DETAILS, REMOVE_DETAILS} from './ingredientDetailsSlice';
import { AnyAction } from 'redux';


const detail = {
  _id: 'testId',
  calories: 100,
  carbohydrates: 200,
  fat: 300,
  image: 'http://test.com/test.jpg',
  name: 'Test name',
  proteins: 400
};

const initialState = {
  _id: '',
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  name: '',
  proteins: 0
}

describe('Test IngredientDetailsSlice', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({...initialState});
  });

  it('should set details', () => {
    expect(reducer(initialState, SET_DETAILS(detail))).toEqual({
      ...detail
    });
  });

  it('should remove details', () => {
    expect(reducer(detail, REMOVE_DETAILS)).toEqual({...initialState});
  })
});
