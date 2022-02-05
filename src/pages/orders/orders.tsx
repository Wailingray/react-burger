import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import { ProfileNavBar } from "../../components/profile-nav/profile-nav";
import { dispatchLogout, removeServerError } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
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
          <ProfileNavBar />
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
