import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { dispatchGetUser } from "../../services/actions/user";
import {
  ProtectedRouteProps,
  TLocationState,
} from "../../services/utils/interfaces";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/wsVanillaActions";
import { getItems } from "../../services/actions/ingredients";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    dispatch(dispatchGetUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!user) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={() => children} />;
};
