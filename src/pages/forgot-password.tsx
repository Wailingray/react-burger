import React from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ForgotPasswordPage: React.FC = () => {

  const handleSubmit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    console.log(value)
  }

  const [value, setValue] = React.useState("")

  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={value}
            name={"email"}
            placeholder="Укажите e-mail"
            size="default"
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        <Button type="primary" size="large" onClick={(e) => handleSubmit(e)}>
          Восстановить
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
