import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchGetUser, dispatchLogout } from "../services/actions/user";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { user, submitServerRequest, submitLogoutSuccess } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(dispatchGetUser());
  }, []);

  useEffect(() => {
    setEmailValue(user.email);
    setNameValue(user.name);
  }, [user]);

  useEffect(() => {
    if (submitLogoutSuccess) history.push({ pathname: "/login" });
  }, [submitLogoutSuccess]);

  const handleLogout = () => {
    dispatch(dispatchLogout());
  };

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  return (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
            activeClassName={`${styles.activeLink}`}
          >
            Профиль
          </NavLink>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile/orders"}
            activeClassName={`${styles.activeLink}`}
          >
            История заказов
          </NavLink>
          <button
            className={`${styles.logoutButton} text text_type_main-medium`}
            onClick={() => handleLogout()}
          >
            Выход
          </button>
          <p
            className={`${styles.comment} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <form className={styles.form} action="">
          <form className={`${styles.inputContainer} mb-6`}>
            <Input
              value={nameValue}
              name={"name"}
              placeholder="Имя"
              size="default"
              onChange={(e) => setNameValue(e.target.value)}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <EmailInput
              value={emailValue}
              name={"email"}
              size="default"
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <PasswordInput
              value={pwdValue}
              name={"password"}
              size="default"
              onChange={(e) => setPwdValue(e.target.value)}
            />
          </form>
          <div className={`${styles.buttonsContainer} mb-6`}>
            <Button type="primary" size="medium">
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
