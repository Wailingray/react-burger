import React from "react";
import styles from "./login.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginPage: React.FC = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Вход</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"email"}
            size="default"
            placeholder="E-mail"
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
          Войти
        </Button>
        <div className={`${styles.linkContainer} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <a
            href=""
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            Зарегистрироваться
          </a>
        </div>
        <div className={`${styles.linkContainer} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <a
            href=""
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            Восстановить пароль
          </a>
        </div>
      </form>
    </div>
  );
};
