import React, { useCallback, useEffect, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchGetUser, dispatchUserEmail, submitCanResetPwd } from "../services/actions/user";
import { Loader } from "../components/loader/loader";


export const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    submitServerRequest,
    submitUserEmailSuccess,
    submitGetUserSuccess,
    submitServerFailed,
    submitServerError,
    foundNoTokens,
    user
  } = useAppSelector((state) => state.user);
  let history = useHistory();

  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (submitUserEmailSuccess && !submitServerRequest) {
      dispatch(submitCanResetPwd())
      history.push({ pathname: "/reset-password" });
    }
  }, [submitUserEmailSuccess, submitServerRequest]);

  useEffect(() => {
    if (user)
      history.push({ pathname: "/" });
  }, [user]);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();
      dispatch(dispatchUserEmail(value));
    },
    [value]
  );

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
            onChange={(e) => {console.log(e.target.value);
              setValue(e.target.value)}}
          />
        </form>
        {submitServerFailed && (
          <p className="text text_type_main-default text_color_inactive mb-4">
            Произошла ошибка! Код ошибки: {submitServerError}
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
  )
};
