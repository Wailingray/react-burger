import React, { useState } from "react";
import styles from "./profile.module.css";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {

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
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile/login"}
            activeClassName={`${styles.activeLink}`}
          >
            Выход
          </NavLink>
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
          <Button type="primary" size="large">
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};
