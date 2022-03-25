import {BrowserRouter as Router, Switch} from 'react-router-dom';
import styles from './App.module.css';
import AppHeader from 'components/app-header/AppHeader';
import {
    ForgotPasswordPage,
    LoginPage,
    OrderFeedPage,
    RegisterPage,
    ResetPasswordPage
} from '../../pages';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import ModalSwitch from '../modal-switch/ModalSwitch';
import { useAppDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { getItems } from '../../services/actions/burgerIngredients';
import ProfileView from '../profile-view/ProfileView';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <div className={styles.Root}>
            <Router>
                <AppHeader/>
                <ModalSwitch/>
                <Switch>
                    <ProtectedRoute path="/profile">
                        <ProfileView/>
                    </ProtectedRoute>
                </Switch>
                <Switch>
                    <ProtectedRoute path="/reset-password" exact>
                        <ResetPasswordPage/>
                    </ProtectedRoute>
                </Switch>
                <Switch>
                    <ProtectedRoute path="/forgot-password" exact >
                        <ForgotPasswordPage/>
                    </ProtectedRoute>
                </Switch>
                <Switch>
                    <ProtectedRoute path="/register" exact >
                        <RegisterPage/>
                    </ProtectedRoute>
                </Switch>
                <Switch>
                    <ProtectedRoute path="/feed" exact >
                        <OrderFeedPage/>
                    </ProtectedRoute>
                </Switch>
                <Switch>
                    <ProtectedRoute path="/login" exact >
                        <LoginPage/>
                    </ProtectedRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
