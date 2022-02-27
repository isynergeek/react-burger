import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ROUTES from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { userProfile } from '../../services/actions/userProfile';

interface IProtectedRouteProps {
  children: JSX.Element | JSX.Element[],
  path: string,

  [rest: string]: unknown
}

const ProtectedRoute = ({
  children,
  path,
  ...rest
}: IProtectedRouteProps) => {

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.userProfile.isAuth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(userProfile.getUser())
      .finally(() => setUserLoaded(true));
  }, []);

  const guestRoutes = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ];

  const authRoutes = [
    ROUTES.PROFILE
  ];

  if (!isUserLoaded) {
    return null;
  }

  const renderHandler = (location: unknown) => {
    if (isAuth && guestRoutes.includes(path)) {
      return (<Redirect to={ROUTES.CONSTRUCTOR}/>);
    }

    if (!isAuth && authRoutes.includes(path)) {
      return (<Redirect to={{pathname: ROUTES.LOGIN, state: {from: location}}}/>);
    }
    return children;
  };

  return (
    <Route {...rest} render={({location}) => renderHandler(location)}/>
  );
};

export default ProtectedRoute;
