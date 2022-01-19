import React from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ResetPasswordPage: React.FC = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"new_password"}
            placeholder="Введите новый пароль"
            size="default"
            onChange={(e) => e.target.value}
            icon={"ShowIcon"}
          />
        </form>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"code"}
            placeholder="Введите код из письма"
            size="default"
            onChange={(e) => e.target.value}
          />
        </form>
        <Button type="primary" size="large">
          Сохранить
        </Button>
        <div className={`${styles.linkContainer} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link
            className={`${styles.link} text text_type_main-default text_color_inactive`}
            to={"/login"}
          >
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
