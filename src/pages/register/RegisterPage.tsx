import styles from './RegisterPage.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import RegistrationLayout from "../../components/registration-layout/RegistrationLayout";
import { Link, useHistory } from 'react-router-dom';
import ROUTES from 'constants/routes';
import { ChangeEvent, useState } from 'react';
import { userProfile } from '../../services/actions/userProfile';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { storageService } from '../../services/storageService';

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const errorMessage = useAppSelector(state => state.userProfile.errorMessage);
    const history = useHistory();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const registerBtnHandler = () => {
      const isValid = Object.values(state).every(Boolean);
      if (!isValid) {
        return;
      }
      dispatch(userProfile.register({ ...state }))
        .unwrap()
        .then(response => {
          const accessToken = response.accessToken.split('Bearer ')[1];
          storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
          history.push(ROUTES.CONSTRUCTOR);
        })
        .catch(() => {
          storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null);
          storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null);
        });
    };

    return (
        <RegistrationLayout>
            <section className={styles.Form}>
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
                  error={!!errorMessage && !!state.email}
                  errorText={errorMessage}
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
                    <Button type="primary" size="large" onClick={registerBtnHandler}>
                        Зарегистрироваться
                    </Button>
                </div>
                <div className="mb-20" />
                <div className={`${styles.Text} text text_type_main-default`}>
                    Уже зарегистрированы? <Link to={ROUTES.LOGIN} className={styles.TextLink}>Войти</Link>
                </div>
            </section>
        </RegistrationLayout>
    );
};

export default RegisterPage;
