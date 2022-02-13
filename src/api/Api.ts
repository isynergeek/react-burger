import { storageService } from '../services/storageService';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const ORDER_URL = `${BASE_URL}/orders`;
const USER_REGISTER_URL = `${BASE_URL}/auth/register`;
const USER_RECOVER_URL = `${BASE_URL}/password-reset`;
const USER_PASSWORD_RESET_URL = `${BASE_URL}/password-reset/reset`;
const USER_LOGIN_URL = `${BASE_URL}/auth/login`;
const USER_LOGOUT_URL = `${BASE_URL}/auth/logout`;
const USER_REFRESH_TOKEN_URL = `${BASE_URL}/auth/token`;
const USER_DATA_URL = `${BASE_URL}/auth/user`;

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json()
    .then(e => {
      throw new Error(e.message);
    });
};

export const getIngredients = () => {
  return fetch(INGREDIENTS_URL)
    .then(checkResponse);
};

export const makeOrder = (ingredients: (string | undefined)[]) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Authorization' : 'Bearer ' + storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ingredients })
  })
    .then(checkResponse);
};

export interface IUserRegister {
  name: string,
  email: string,
  password: string
}

const register = (data: IUserRegister) => {
  return fetch(USER_REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
};

export interface IUserRecover {
  email: string
}

const recover = (data: IUserRecover) => {
  return fetch(USER_RECOVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
};

export interface IUserPasswordReset {
  password: string,
  token: string
}

const passwordReset = (data: IUserPasswordReset) => {
  return fetch(USER_PASSWORD_RESET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
}

export interface IUserLogin {
  email: string,
  password: string
}

const login = (data: IUserLogin) => {
  return fetch(USER_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
}

export interface IUserLogout {
  token: string
}

const logout = (data: IUserLogout) => {
  return fetch(USER_LOGOUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
}

const doRefreshToken = () => {
  return fetch(USER_REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: storageService.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    })
  })
    .then(checkResponse);
}

const getUser = () => {
  return fetch(USER_DATA_URL, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      'Content-Type': 'application/json'
    },
  })
    .then(checkResponse);
}

const updateUser = (data: IUserRegister) => {
  return fetch(USER_DATA_URL, {
    method: 'PATCH',
    headers: {
      'Authorization' : 'Bearer ' + storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse);
}


export const userProfileApi = {
  register,
  recover,
  passwordReset,
  login,
  logout,
  getUser,
  updateUser,
  doRefreshToken,
};



