import IngredientDetails from 'components/ingredient-details/IngredientDetails';
import Modal from 'components/modal/Modal';
import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import { OrdersPage } from 'pages';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { REMOVE_DETAILS } from '../../services/reducers/ingredientDetailsSlice';
import HomePage from '../../pages/home/HomePage';
import IngredientDetailsPage from '../../pages/ingredient-details/IngredientDetailsPage';
import * as H from 'history';

interface ILocationStateModalSwitch {
  background: H.Location
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
          <Route path='/' exact>
            <HomePage />
          </Route>
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            exact
          >
            <OrdersPage />
          </ProtectedRoute>
          <Route
                 path='/ingredients/:ingredientId'
                 exact
          >
            <IngredientDetailsPage />
          </Route>
        </Switch>
        <Switch>
        {background && (
          <Route
            path='/ingredients/:ingredientId'
            exact
          >
            <Modal close={handleModalClose}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}

        {background && (
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            exact
            >
            <Modal close={handleModalClose}>
              <OrdersPage />
            </Modal>
          </ProtectedRoute>
        )}
        </Switch>
      </>
    );
};

export default ModalSwitch;
