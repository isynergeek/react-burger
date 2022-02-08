import { storageService } from '../services/storageService';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
const USER_REGISTER_URL = 'https://norma.nomoreparties.space/api/auth/register';
const USER_RECOVER_URL = 'https://norma.nomoreparties.space/api/password-reset';
const USER_PASSWORD_RESET_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';
const USER_LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
const USER_LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
const USER_REFRESH_TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token';
const USER_DATA_URL = 'https://norma.nomoreparties.space/api/auth/user';

export const getIngredients = () => {
  return fetch(BASE_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка запроса: ${BASE_URL}`);
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка запроса: ${ORDER_URL}`);
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });

    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
}

const getUser = () => {
  return fetch(USER_DATA_URL, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then(e => {
          throw new Error(e.message);
        });
    });
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



