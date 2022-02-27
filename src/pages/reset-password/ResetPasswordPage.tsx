import styles from './ResetPasswordPage.module.css';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import RegistrationLayout from '../../components/registration-layout/RegistrationLayout';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import React, { ChangeEvent, useState } from 'react';
import { userProfile } from '../../services/actions/userProfile';
import { useAppDispatch } from '../../services/hooks';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    password: '',
    passwordError: false,
    passwordErrorMessage: '',
    token: '',
    tokenError: false,
    tokenErrorMessage: '',
  });

  interface ILocationState {
    from: string,
    email: string
  }

  const location = useLocation<ILocationState>();

  const locationState = {
    from: location.state?.from,
    email: location.state?.email
  }

  if (locationState.from !== ROUTES.FORGOT_PASSWORD || !locationState.email) {
    return <Redirect to={ROUTES.FORGOT_PASSWORD}/>
  }

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = event.target;

    setState({
      ...state,
      [name]: value,
      passwordError: false,
      passwordErrorMessage: '',
      tokenError: false,
      tokenErrorMessage: '',
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.password) {
      setState({
        ...state,
        passwordError: true,
        passwordErrorMessage: 'Ошибка ввода пароля',
      });
    }

    if (!state.token) {
      setState({
        ...state,
        tokenError: true,
        tokenErrorMessage: 'Ошибка ввода кода',
      });
    }

    if (!state.password || !state.token) {
      return;
    }

    dispatch(userProfile.passwordReset({
      password: state.password,
      token: state.token
    }))
      .unwrap()
      .then(response => {
        if (response.success) {
          history.push(ROUTES.LOGIN);
        }
        setState({...state,
          tokenError: true,
          tokenErrorMessage: response.message,
        })
      })
      .catch(e => {
        setState({...state,
          tokenError: true,
          tokenErrorMessage: e.message,
        })
      });
  };

  return (
    <RegistrationLayout>
      <form  className={styles.Form} onSubmit={handleSubmitForm}>
        <div className={`${styles.Title} text text_type_main-medium`}>Восстановление пароля</div>
        {state.passwordError && <div
          className={`${styles.Text} text text_type_main-default`}>{state.passwordErrorMessage}</div>}
        <div className="mb-6"/>
        <PasswordInput onChange={inputChangeHandler} value={state.password} name={'password'}/>
        <div className="mb-6"/>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={inputChangeHandler}
          value={state.token}
          name={'token'}
          error={state.tokenError}
          errorText={state.tokenErrorMessage}
          size={'default'}
        />
        <div className="mb-6"/>
        <div>
          <Button type="primary" size="large" htmlType={'submit'}>
            Сохранить
          </Button>
        </div>
        <div className="mb-20"/>
        <div className={`${styles.Text} text text_type_main-default`}>Вспомнили пароль? <Link
          to={ROUTES.LOGIN} className={styles.TextLink}>Войти</Link></div>
      </form>
    </RegistrationLayout>
  );
};

export default ResetPasswordPage;
