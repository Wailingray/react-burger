import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { dispatchGetUser } from '../../services/actions/user';
import { ProtectedRouteProps } from '../../services/utils/interfaces';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path , exact}) => {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(
    (state) => state.user
  );
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    console.log('disp');
    dispatch(dispatchGetUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
