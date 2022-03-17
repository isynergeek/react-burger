import styles from './ProfilePage.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { userProfile } from '../../services/actions/userProfile';
import { UPDATE_USER_DATA } from '../../services/reducers/userProfileSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userProfile.user);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    dispatch(userProfile.getUser())
      .unwrap()
      .then(response => {
        if (!response) {
          return;
        }
        const { name, email } = response.user;
        dispatch(UPDATE_USER_DATA({ name, email }));
        setState({ ...state, email, name });
      });
  }, []);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    setIsFormChanged(true);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = Object.values(state)
      .every(Boolean);
    if (!isValid) {
      return;
    }
    dispatch(userProfile.updateUser({ ...state }))
      .unwrap()
      .then(response => {
        dispatch(UPDATE_USER_DATA({
          name: response.user.name,
          email: response.user.email,
        }));
        setIsFormChanged(false);
      });
  };

  const cancelBtnClickHandler = () => {
    setState({
      email: userData.email,
      name: userData.name,
      password: '',
    });
    setIsFormChanged(false);
  };

  return (
    <form className={styles.Root} onSubmit={handleSubmitForm}>
      <div className={styles.Form}>
        <Input
          icon={'EditIcon'}
          type={'text'}
          placeholder={'Имя'}
          onChange={inputChangeHandler}
          value={state.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div className="mb-6"/>
        <Input
          type={'email'}
          icon={'EditIcon'}
          placeholder={'Логин'}
          onChange={inputChangeHandler}
          value={state.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div className="mb-6"/>
        <PasswordInput onChange={inputChangeHandler} value={state.password} name={'password'}/>
        <div className="mb-6"/>
        {isFormChanged && (<div className={styles.Controls}>
          <Button type="secondary" size="medium" onClick={cancelBtnClickHandler}>
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType={'submit'}>
            Сохранить
          </Button>
        </div>)}
      </div>
    </form>
  );
};

export default ProfilePage;
