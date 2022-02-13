import styles from './LoginPage.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RegistrationLayout from "../../components/registration-layout/RegistrationLayout";
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import ROUTES from "../../constants/routes";
import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { userProfile } from '../../services/actions/userProfile';
import { storageService } from '../../services/storageService';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<{from:string}>();

    const isAuth = useAppSelector(state => state.userProfile.isAuth);
    if (isAuth) {
      return (<Redirect
          to={ location.state?.from || '/' }
        />);
    }

    const [state, setState] = useState({
        email: '',
        emailErrorMessage: '',
        emailError: false,
        password: '',
        passwordErrorMessage: '',
        passwordError: false,
    });

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!state.email) {
            setState({...state, emailError: true, emailErrorMessage: 'Ошибка ввода e-mail'})
        }
        if (!state.password) {
            setState({...state, passwordError: true, passwordErrorMessage: 'Ошибка ввода пароля'})
        }

        if (!state.password || !state.email) {
          return;
        }

        dispatch(userProfile.login({
          email: state.email,
          password: state.password
        }))
          .unwrap()
          .then(response => {
            if (!response.success) {
              throw new Error(response.message);
            }
            const accessToken = response.accessToken.split('Bearer ')[1];
            storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
            history.push(ROUTES.CONSTRUCTOR);
          })
          .catch(e => {
            storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null);
            storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null);
            setState({
              ...state,
              emailError: true,
              emailErrorMessage: e.message
            });
          })
    }

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setState({
          ...state,
          [name]: value,
          emailError: false,
          emailErrorMessage: '',
          passwordError: false,
          passwordErrorMessage: ''
        });
    };

    return (
      <RegistrationLayout>
        <form className={styles.Form} onSubmit={handleSubmitForm}>
          <div className={`${styles.Title} text text_type_main-medium`}>Вход</div>
          <div className="mb-6"/>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={inputChangeHandler}
            value={state.email}
            name={'email'}
            error={state.emailError}
            errorText={state.emailErrorMessage}
            size={'default'}
          />
          <div className="mb-6"/>
          <PasswordInput onChange={inputChangeHandler} value={state.password} name={'password'}/>
          {state.passwordError && <div
            className={`${styles.Text} text text_type_main-default`}>{state.passwordErrorMessage}</div>}
          <div className="mb-6"/>
          <div>
            <Button type="primary" size="large" htmlType={'submit'}>
              Войти
            </Button>
          </div>
          <div className="mb-20"/>
          <div className={`${styles.Text} text text_type_main-default`}>Вы — новый
            пользователь? <Link to={ROUTES.REGISTER}
                                className={styles.TextLink}>Зарегистрироваться</Link></div>
          <div className="mb-4"/>
          <div className={`${styles.Text} text text_type_main-default`}>Забыли пароль? <Link
            to={ROUTES.FORGOT_PASSWORD}
            className={styles.TextLink}>Восстановить пароль</Link></div>
        </form>
      </RegistrationLayout>
    );
};

export default LoginPage;
