import styles from './ProfileLayout.module.css';
import ProfileNavMenu from '../profile-nav-menu/ProfileNavMenu';
import ROUTES from '../../constants/routes';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { OrdersPage, ProfilePage } from '../../pages';

const ProfileView = () => {
  const { path } = useRouteMatch();

  return (
    <section className={styles.Root}>
      <div className={styles.Container}>
        <ProfileNavMenu/>
        <section className={styles.Content}>
          <Switch>
            <Route exact path={ROUTES.ORDERS}>
              <OrdersPage/>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={path}>
              <ProfilePage/>
            </Route>
          </Switch>
        </section>
      </div>
    </section>
  );
};

export default ProfileView;
