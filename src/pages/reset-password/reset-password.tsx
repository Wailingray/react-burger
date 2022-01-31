import React, { useEffect, useState } from "react";
import styles from "./reset-password.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  dispatchGetUser,
  dispatchPwdReset,
  submitCannotResetPwd,
} from "../../services/actions/user";
import { Loader } from "../../components/loader/loader";

export const ResetPasswordPage: React.FC = () => {
  const [pwdValue, setPwdValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const dispatch = useAppDispatch();

  const history = useHistory();
  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    canResetPwd,
    submitServerFailed,
    submitServerError,
    submitPwdResetSuccess,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user || !canResetPwd) history.push({ pathname: "/" });
    return () => {
      dispatch(submitCannotResetPwd());
    };
  }, [user]);

  const handleSubmit = (
    e: React.SyntheticEvent<Element, Event>,
    pwdValue: string,
    codeValue: string
  ) => {
    e.preventDefault();
    dispatch(
      dispatchPwdReset({
        password: pwdValue,
        token: codeValue,
      })
    );
  };

  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={pwdValue}
            name={"password"}
            placeholder="Введите новый пароль"
            size="default"
            onChange={(e) => setPwdValue(e.target.value)}
            icon={"ShowIcon"}
          />
        </form>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={codeValue}
            name={"code"}
            placeholder="Введите код из письма"
            size="default"
            onChange={(e) => setCodeValue(e.target.value)}
          />
        </form>
        {submitPwdResetSuccess && (
          <p className="text text_type_main-default text_color_inactive mb-6">
            Данные успешно изменены!
          </p>
        )}
        {submitServerFailed && (
          <p className="text text_type_main-default text_color_inactive mb-6">
            Произошла ошибка! Код ошибки: {submitServerError}
          </p>
        )}
        <Button
          type="primary"
          size="large"
          onClick={(e) => handleSubmit(e, pwdValue, codeValue)}
        >
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
