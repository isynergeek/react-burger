import styles from './ProfileNavMenu.module.css';
import { useAppDispatch } from '../../services/hooks';
import { userProfile } from '../../services/actions/userProfile';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { storageService } from '../../services/storageService';
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { UPDATE_USER_DATA } from '../../services/reducers/userProfileSlice';

enum NavItemType {
  PROFILE,
  ORDERS
}

const ProfileNavMenu = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const onLogoutClickHandler = () => {
    const refreshToken = storageService.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      return;
    }
    dispatch(userProfile.logout({ token: refreshToken }))
      .unwrap()
      .then(response => {
        if (response.success) {
          storageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null);
          storageService.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null);
          dispatch(UPDATE_USER_DATA({
            email: '',
            name: ''
          }));
          history.push(ROUTES.CONSTRUCTOR);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const itemClickHandler = (type: NavItemType) => {
    switch (type) {
      case NavItemType.ORDERS: {
        history.push(ROUTES.ORDERS);
        return;
      }
      default: {
        history.push(ROUTES.PROFILE);
      }
    }
  }

  return (
    <section className={styles.NavBar}>
      <nav className={styles.Menu}>
        <div
          className={`${styles.MenuItem} ${pathname === ROUTES.PROFILE ? styles.MenuItem_isActive : ''} text text_type_main-medium`} onClick={() => itemClickHandler(NavItemType.PROFILE)}>Профиль</div>
        <div className={`${styles.MenuItem} ${pathname === ROUTES.ORDERS ? styles.MenuItem_isActive : ''} text text_type_main-medium`} onClick={() => itemClickHandler(NavItemType.ORDERS)}>История заказов</div>
        <div className={`${styles.MenuItem} text text_type_main-medium`}
             onClick={onLogoutClickHandler}>Выход
        </div>
      </nav>
      <div className="mb-20"/>
      <div className={`${styles.NavBarText} text text_type_main-default`}>В этом разделе вы
        можете <br/> изменить свои персональные данные
      </div>
    </section>
  );
};

export default ProfileNavMenu;
