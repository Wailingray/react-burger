import React, { useCallback, useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  dispatchGetUser,
  dispatchSignIn,
  removeServerError,
  submitGetUserSuccess,
} from "../../services/actions/user";
import { TLocationState } from "../../services/utils/interfaces";
import { Loader } from "../../components/loader/loader";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  validateInput,
} from "../../services/validations/user-validation";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loaded, setIsLoaded] = useState(true);

  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerFailed,
    submitServerError,
  } = useAppSelector((state) => state.user);

  const location = useLocation<TLocationState>();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || pwdError) return null;
    else dispatch(removeServerError());
    dispatch(
      dispatchSignIn({
        email: email,
        password: pwd,
      })
    );
  };

  //Если есть нужный токен в куках, то при заходе на страницу фетчится юзер
  /* useEffect(() => {
    if (!user) dispatch(dispatchGetUser());
    return () => {
      dispatch(removeServerError());
    };
  }, []); */

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true);
  }, [submitGetUserSuccess, foundNoTokens]);

  useEffect(() => {
    if (user) {
      if (location.state)
        history.push({ pathname: `${location.state.from.pathname}` });
      else return history.push({ pathname: "/" });
    }
  }, [user]);

  const changeEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateInput(emailSchema, setEmailError, email);

  };

  const changePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
    validateInput(passwordSchema, setPwdError, pwd);

  };

  return loaded ? (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} onSubmit={signIn}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <div className={`${styles.inputContainer} mb-6`}>
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
        </div>
        <div className={`${styles.inputContainer} mb-6`}>
          <Input
            type={showPwd ? "text" : "password"}
            placeholder="Пароль"
            value={pwd}
            error={pwdError}
            errorText="Введите валидный пароль!"
            name={"password"}
            size="default"
            icon="ShowIcon"
            onIconClick={() => setShowPwd(!showPwd)}
            onChange={(e) => changePasswordField(e)}
            onBlur={() => validateInput(passwordSchema, setPwdError, pwd)}
          />
        </div>
        {submitServerFailed && (
          <p className="text text_type_main-default text_color_inactive mb-6">
            Произошла ошибка! Код ошибки: {submitServerError}
          </p>
        )}
        <Button
          type="primary"
          size="large"
          disabled={pwdError || emailError || !email || !pwd}
        >
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
  ) : (
    <Loader />
  );
};
