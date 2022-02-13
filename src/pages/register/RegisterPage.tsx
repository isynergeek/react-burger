import styles from './RegisterPage.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import RegistrationLayout from "../../components/registration-layout/RegistrationLayout";
import { Link, useHistory } from 'react-router-dom';
import ROUTES from 'constants/routes';
import React, { ChangeEvent, useState } from 'react';
import { userProfile } from '../../services/actions/userProfile';
import { useAppDispatch } from '../../services/hooks';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { storageService } from '../../services/storageService';

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        errorMessage: '',
    });

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState({
            ...state,
            [name]: value,
            error: false,
            errorMessage: ''
        });
    };

    const handleSubmitBtnClick = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(userProfile.register({ ...state }))
        .unwrap()
        .then(response => {
          const accessToken = response.accessToken.split('Bearer ')[1];
          storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
          history.push(ROUTES.CONSTRUCTOR);
        })
        .catch((e) => {
          storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null);
          storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null);
          setState({...state, error: true, errorMessage: e.message});
        });
    };

    return (
        <RegistrationLayout>
            <form className={styles.Form} onSubmit={handleSubmitBtnClick}>
                <div className={`${styles.Title} text text_type_main-medium`}>Регистрация</div>
                <div className="mb-6" />
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={inputChangeHandler}
                    value={state.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <div className="mb-6" />
                <Input
                  type={'email'}
                  placeholder={'E-mail'}
                  onChange={inputChangeHandler}
                  value={state.email}
                  name={'email'}
                  error={state.error}
                  errorText={state.errorMessage}
                  size={'default'}
                />
                <div className="mb-6" />
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  onChange={inputChangeHandler}
                  value={state.password}
                  name={'password'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className="mb-6" />
                <div>
                    <Button type="primary" size="large" htmlType={'submit'}>
                        Зарегистрироваться
                    </Button>
                </div>
                <div className="mb-20" />
                <div className={`${styles.Text} text text_type_main-default`}>
                    Уже зарегистрированы? <Link to={ROUTES.LOGIN} className={styles.TextLink}>Войти</Link>
                </div>
            </form>
        </RegistrationLayout>
    );
};

export default RegisterPage;
