import IngredientDetails from 'components/ingredient-details/IngredientDetails';
import Modal from 'components/modal/Modal';
import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import { OrderInfoPage } from 'pages';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { REMOVE_DETAILS } from '../../services/reducers/ingredientDetailsSlice';
import HomePage from '../../pages/home/HomePage';
import IngredientDetailsPage from '../../pages/ingredient-details/IngredientDetailsPage';
import * as H from 'history';
import OrderInfo from '../order-info/OrderInfo';

interface ILocationStateModalSwitch {
  background: H.Location;
}

const ModalSwitch = () => {
  const location = useLocation<ILocationStateModalSwitch>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const background: H.Location = location?.state?.background;

  const handleModalClose = () => {
    dispatch(REMOVE_DETAILS());
    history.goBack();
  };

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <ProtectedRoute
          path="/profile/orders/:id"
          exact
        >
          <OrderInfoPage/>
        </ProtectedRoute>
        <Route
          path="/ingredients/:ingredientId"
          exact
        >
          <IngredientDetailsPage/>
        </Route>
        <Route
          path="/feed/:id"
          exact
        >
          <OrderInfoPage/>
        </Route>
      </Switch>
      <Switch>
        {background && (
          <Route
            path="/ingredients/:ingredientId"
            exact
          >
            <Modal close={handleModalClose}>
              <IngredientDetails/>
            </Modal>
          </Route>
        )}

        {background && (
          <ProtectedRoute
            path="/profile/orders/:id"
            exact
          >
            <Modal close={handleModalClose}>
              <OrderInfo/>
            </Modal>
          </ProtectedRoute>
        )}

        {background && (
          <Route
            path="/feed/:id"
            exact
          >
            <Modal close={handleModalClose}>
              <OrderInfo/>
            </Modal>
          </Route>
        )}
      </Switch>
    </>
  );
};

export default ModalSwitch;
