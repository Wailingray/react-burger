import React from "react";
import styles from "./profile.module.css";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
  return (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
          >
            Профиль
          </NavLink>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
          >
            История заказов
          </NavLink>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
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
              value={"фыв"}
              name={"name"}
              placeholder="Имя"
              size="default"
              onChange={(e) => e.target.value}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <EmailInput
              value={"фыв"}
              name={"name"}
              size="default"
              onChange={(e) => e.target.value}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <PasswordInput
              value={""}
              name={"password"}
              size="default"
              onChange={(e) => e.target.value}
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
