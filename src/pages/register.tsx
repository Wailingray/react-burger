import React from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={""}
            name={"email"}
            size="default"
            placeholder="Имя"
            onChange={(e) => e.target.value}
          />
        </form>
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
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
        <div className={`${styles.linkContainer} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
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
