import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserLogin, IUserLogout,
  IUserPasswordReset,
  IUserRecover,
  IUserRegister,
  userProfileApi
} from '../../api/Api';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { storageService } from '../storageService';

const login = createAsyncThunk('USER_PROFILE/LOGIN', (data: IUserLogin) => userProfileApi.login(data));
const logout = createAsyncThunk('USER_PROFILE/LOGOUT', (data: IUserLogout) => userProfileApi.logout(data));
const register = createAsyncThunk('USER_PROFILE/REGISTER', (data: IUserRegister) => userProfileApi.register(data));
const recover = createAsyncThunk('USER_PROFILE/RECOVER', (data: IUserRecover) => userProfileApi.recover(data));
const passwordReset = createAsyncThunk('USER_PROFILE/PASSWORD_RESET', (data: IUserPasswordReset) => userProfileApi.passwordReset(data));

const getUser = createAsyncThunk('USER_PROFILE/GET_USER', async () => {
  let response;
  try {
    response = await userProfileApi.getUser();
  } catch (e) {
    const tokenResponse = await userProfileApi.doRefreshToken();
    if (tokenResponse.success) {
      storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokenResponse.accessToken.split('Bearer ')[1]);
      storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, tokenResponse.refreshToken);
      response = await userProfileApi.getUser();
    }
  }
  return response;
});

const updateUser = createAsyncThunk('USER_PROFILE/UPDATE_USER', async (data: IUserRegister) => {
  let response;
  try {
    response = await userProfileApi.updateUser(data);
  } catch (e) {
    const tokenResponse = await userProfileApi.doRefreshToken();
    if (tokenResponse.success) {
      storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokenResponse.accessToken.split('Bearer ')[1]);
      storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, tokenResponse.refreshToken);
      response = await userProfileApi.updateUser(data);
    }
  }
  return response;
});

export const userProfile = {
  register,
  recover,
  passwordReset,
  login,
  logout,
  getUser,
  updateUser
};
