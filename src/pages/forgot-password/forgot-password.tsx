import React, { useCallback, useEffect, useState } from "react";
import styles from "./forgot-password.module.css";
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
  dispatchUserEmail,
  removeServerError,
  submitCanResetPwd,
} from "../../services/actions/user";
import { Loader } from "../../components/loader/loader";
import {
  emailSchema,
  validateInput,
} from "../../services/validations/user-validation";

export const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    submitServerRequest,
    submitUserEmailSuccess,
    submitGetUserSuccess,
    submitServerFailed,
    submitServerError,
    foundNoTokens,
    user,
  } = useAppSelector((state) => state.user);
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  //Если есть нужный токен в куках, то при заходе на страницу фетчится юзер
  useEffect(() => {
    if (!user) dispatch(dispatchGetUser());
    return () => {
      dispatch(removeServerError());
    };
  }, []);

  useEffect(() => {
    if (submitUserEmailSuccess && !submitServerRequest) {
      dispatch(submitCanResetPwd());
      history.push({ pathname: "/reset-password" });
    }
    return () => {
      dispatch(removeServerError());
    };
  }, [submitUserEmailSuccess, submitServerRequest]);

  useEffect(() => {
    if (user) history.push({ pathname: "/" });
  }, [user]);

  const changeEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateInput(emailSchema, setEmailError, email);
  };

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      e.preventDefault();
      if (emailError) return null;
      else {
        dispatch(removeServerError());
        dispatch(dispatchUserEmail(email));
      }
    },
    [email, emailError]
  );

  return (
    <div className={`${styles.formContainer}`}>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={email}
            name={"email"}
            placeholder="E-mail"
            error={emailError}
            errorText="Введите валидный e-mail!"
            size="default"
            onChange={(e) => changeEmailField(e)}
            onBlur={() => validateInput(emailSchema, setEmailError, email)}
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
      </div>
    </div>
  );
};
