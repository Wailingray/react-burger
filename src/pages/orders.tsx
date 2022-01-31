import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { dispatchLogout, removeServerError } from "../services/actions/user";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import styles from "./orders.module.css";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
  } = useAppSelector((state) => state.user);

  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true);
    return () => {
      dispatch(removeServerError());
    };
  }, [submitGetUserSuccess, foundNoTokens]);

  const handleLogout = () => {
    dispatch(dispatchLogout());
  };

  return loaded ? (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
            activeClassName={`${styles.activeLink}`}
            exact={true}
          >
            Профиль
          </NavLink>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile/orders"}
            activeClassName={`${styles.activeLink}`}
            exact={true}
          >
            История заказов
          </NavLink>
          <button
            className={`${styles.logoutButton} text text_type_main-medium`}
            onClick={() => handleLogout()}
          >
            Выход
          </button>
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <form className={styles.form} action="">
          Страница находится в разработке!
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
