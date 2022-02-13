import styles from './ForgotPasswordPage.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import RegistrationLayout from '../../components/registration-layout/RegistrationLayout';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import React, { ChangeEvent, useState } from 'react';
import { userProfile } from '../../services/actions/userProfile';
import { useAppDispatch } from '../../services/hooks';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [state, setState] = useState({ email: '', errorMessage: '', isValid: true });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({...state, email: value, errorMessage: '', isValid: true});
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = state;
    if (!email) {
      setState({...state, errorMessage: 'Ошибка ввода e-mail', isValid: false});
      return;
    }
    dispatch(userProfile.recover({ email }))
      .unwrap()
      .then(response => {
        if (response.success) {
          history.push(ROUTES.RESET_PASSWORD, {from: path, email});
        }
        throw new Error('Ошибка восстановления пароля');
      })
      .catch(e => {
        setState({...state, errorMessage: e.message, isValid: false});
      });
  };

  return (
    <RegistrationLayout>
      <form className={styles.Form} onSubmit={handleSubmitForm}>
        <div className={`${styles.Title} text text_type_main-medium`}>Восстановление пароля</div>
        <div className="mb-6"/>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={inputChangeHandler}
          value={state.email}
          name={'email'}
          error={!state.isValid}
          errorText={state.errorMessage}
          size={'default'}
        />
        <div className="mb-6"/>
        <div>
          <Button type="primary" size="large" htmlType={'submit'}>
            Восстановить
          </Button>
        </div>
        <div className="mb-20"/>
        <div className={`${styles.Text} text text_type_main-default`}>Вспомнили пароль? <Link
          to={ROUTES.LOGIN}
          className={styles.TextLink}>Войти</Link></div>
      </form>
    </RegistrationLayout>
  );
};

export default ForgotPasswordPage;
