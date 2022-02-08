import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userProfile } from '../actions/userProfile';

interface IUserProfileState {
  request: boolean,
  error: boolean,
  errorMessage: string | undefined,
  user: {
    email: string,
    name: string,
  }
  isAuth: boolean
}

const initialState: IUserProfileState = {
  request: false,
  error: false,
  errorMessage: '',
  user: {
    email: '',
    name: '',
  },
  isAuth: false,
};

interface IUserData {
  email: string,
  name: string,
}

export const userProfileSlice = createSlice({
  name: 'USER_PROFILE',
  initialState,
  reducers: {
    ['UPDATE_USER_DATA'](state, action: PayloadAction<IUserData>) {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Register
       */
      .addCase(userProfile.register.pending, () => {
        return {
          ...initialState,
          request: true,
          error: false
        };
      })
      .addCase(userProfile.register.fulfilled, (state, action) => {
        return {
          request: false,
          error: false,
          errorMessage: '',
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email
          },
          isAuth: true
        };
      })
      .addCase(userProfile.register.rejected, (state, action) => {
        return {
          ...initialState,
          request: false,
          error: true,
          errorMessage: action.error?.message,
        };
      })

      /**
       * Login
       */
      .addCase(userProfile.login.pending, () => {
        return {
          ...initialState,
          request: true,
          error: false
        };
      })
      .addCase(userProfile.login.fulfilled, (state, action) => {
        return {
          request: false,
          error: false,
          errorMessage: '',
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email
          },
          isAuth: true
        };
      })
      .addCase(userProfile.login.rejected, (state, action) => {
        return {
          ...initialState,
          request: false,
          error: true,
          errorMessage: action.error?.message,
        };
      })

      /**
       * Get User
       */
      .addCase(userProfile.getUser.pending, (state) => {
        return {
          ...state,
          request: true,
          error: false
        };
      })
      .addCase(userProfile.getUser.fulfilled, (state, action) => {
        return {
          request: false,
          error: false,
          errorMessage: '',
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email
          },
          isAuth: true
        };
      })
      .addCase(userProfile.getUser.rejected, (state, action) => {
        return {
          ...initialState,
          request: false,
          error: true,
          errorMessage: action.error?.message,
        };
      })

      /**
       * Logout
       */
      .addCase(userProfile.logout.pending, (state) => {
        return {
          ...state,
          request: true,
          error: false
        };
      })
      .addCase(userProfile.logout.fulfilled, () => {
        return {
          ...initialState
        };
      })
      .addCase(userProfile.logout.rejected, (state, action) => {
        return {
          ...state,
          request: false,
          error: true,
          errorMessage: action.error?.message,
        };
      });
  }
});

export const { UPDATE_USER_DATA } = userProfileSlice.actions;

export default userProfileSlice.reducer;
