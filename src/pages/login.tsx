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
        <div className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"email"}
            size="default"
            placeholder="E-mail"
            onChange={e => (e.target.value)}
          />
        </div>
        <div className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"password"}
            size="default"
            placeholder="Пароль"
            onChange={e => (e.target.value)}
          />
        </div>
        <Button type="primary" size="large">Войти</Button>
        <div className={`${styles.link} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            The quick brown fox .
          </p>
          <a href="">jumps over the lazy dog</a>
        </div>
        <div className={`${styles.link} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            The quick brown fox .
          </p>
          <a href="">jumps over the lazy dog</a>
        </div>
      </form>
    </div>
  );
};
