import React, { useCallback } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchUserEmail } from "../services/actions/user";

export const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    submitUserEmailRequest,
    submitUserEmailSuccess,
    submitUserEmailFailed,
    submitUserEmailError,
  } = useAppSelector((state) => state.user);
  const history = useHistory();

  const redirect = useCallback(
    () => {
      if (submitUserEmailSuccess)
        history.replace({ pathname: "/reset-password" });
    },[submitUserEmailSuccess]
  )


  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();
      dispatch(dispatchUserEmail(value));
      if(!submitUserEmailRequest) redirect()
    },
    [
      history,
      submitUserEmailSuccess,
      submitUserEmailFailed,
      submitUserEmailError,
      submitUserEmailRequest
    ]
  );
  console.log(submitUserEmailSuccess);
  const [value, setValue] = React.useState("");

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
        {submitUserEmailFailed && (
          <p className="text text_type_main-default text_color_inactive mt-4">
            Произошла ошибка! Код ошибки: {submitUserEmailError}
          </p>
        )}
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
