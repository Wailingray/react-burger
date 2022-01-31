import React from "react";
import { NavLink } from "react-router-dom";
import { dispatchLogout } from "../../services/actions/user";
import { useAppDispatch } from "../../services/hooks/hooks";
import styles from "./profile-nav.module.css";

export const ProfileNavBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(dispatchLogout());
  };

  return (
    <>
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
      <NavLink
        className={`${styles.link} text text_type_main-medium`}
        to={"/profile"}
        onClick={() => handleLogout()}
        exact={true}
      >
        Выход
      </NavLink>
    </>
  );
};
