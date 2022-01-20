import React from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../services/hooks/hooks";

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const register = () => {};

  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Вход</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"email"}
            placeholder="E-mail"
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
        <Button onClick={() => register()} type="primary" size="large">
          Войти
        </Button>
        <div className={`${styles.linkContainer} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link
            className={`${styles.link} text text_type_main-default text_color_inactive`}
            to={"/register"}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={`${styles.linkContainer} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link
            className={`${styles.link} text text_type_main-default text_color_inactive`}
            to={"/forgot-password"}
          >
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
};
