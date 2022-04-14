import reducer, { UPDATE_USER_DATA } from './userProfileSlice';
import { AnyAction } from 'redux';
import { userProfile } from '../actions/userProfile';

const userData = {
  name: 'Name',
  email: 'test@test.com'
};

const initialState = {
  request: false,
  error: false,
  errorMessage: '',
  user: {
    email: '',
    name: '',
  },
  isAuth: false,
};

describe('Test UserProfileSlice', function () {
  it('should return initial state', () => {
    expect(reducer(undefined, {} as AnyAction))
      .toEqual({ ...initialState });
  });

  it('should update user data', () => {
    const action = UPDATE_USER_DATA(userData);
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        user: {
          email: userData.email,
          name: userData.name
        }
      });
  });

  /**
   * Register
   */

  it('should register on pending', () => {
    const action = {
      type: userProfile.register.pending.type
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: true,
        error: false
      });
  });

  it('should register on fulfilled', () => {
    const action = {
      type: userProfile.register.fulfilled.type,
      payload: {
        user: {
          name: userData.name,
          email: userData.email,
        }
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        user: {
          name: userData.name,
          email: userData.email,
        },
        errorMessage: '',
        request: false,
        error: false,
        isAuth: true
      });
  });

  it('should register on rejected', () => {
    const action = {
      type: userProfile.register.rejected.type,
      error: {
        message: 'Error message'
      }
    };

    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: false,
        error: true,
        errorMessage: 'Error message',
      });
  });

  /**
   * Login
   */

  it('should login on pending', () => {
    const action = {
      type: userProfile.login.pending.type
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: true,
        error: false
      });
  });

  it('should login on fulfilled', () => {
    const action = {
      type: userProfile.login.fulfilled.type,
      payload: {
        user: {
          name: userData.name,
          email: userData.email
        }
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        user: {
          name: userData.name,
          email: userData.email,
        },
        errorMessage: '',
        request: false,
        error: false,
        isAuth: true
      });
  });

  it('should login on rejected', () => {
    const action = {
      type: userProfile.login.rejected.type,
      error: {
        message: 'Error message'
      }
    };

    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: false,
        error: true,
        errorMessage: 'Error message',
      });
  });

  /**
   *  Logout
   */

  it('should logout on pending', () => {
    const action = {
      type: userProfile.logout.pending
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: true,
        error: false
      });
  });

  it('should logout on fulfilled', () => {
    const action = {
      type: userProfile.logout.fulfilled,
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
      });
  });

  it('should logout on rejected', () => {
    const action = {
      type: userProfile.logout.rejected,
      error: {
        message: 'Test error'
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: false,
        error: true,
        errorMessage: 'Test error',
      });
  });

  /**
   * Get user
   */

  it('should get user on pending', () => {
    const action = {
      type: userProfile.getUser.pending.type,
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: true,
        error: false
      });
  });

  it('should get user on fulfilled', () => {

    const action = {
      type: userProfile.getUser.fulfilled.type,
      payload: {
        user: { ...userData }
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        request: false,
        error: false,
        errorMessage: '',
        user: { ...userData },
        isAuth: true
      });
  });

  it('should get user on rejected', () => {
    const action = {
      type: userProfile.getUser.rejected.type,
      error: {
        message: 'Error message'
      }
    };
    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        request: false,
        error: true,
        errorMessage: 'Error message',
      });
  });

});
