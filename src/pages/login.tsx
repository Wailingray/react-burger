import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchSignIn } from "../services/actions/user";
import { TLocationState } from "../services/utils/interfaces";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const dispatch = useAppDispatch();

  const {
    submitServerRequest,
    submitSignInSuccess,
    submitServerFailed,
    submitServerError,
    user,
  } = useAppSelector((state) => state.user);

  let history = useHistory();

  const location = useLocation<TLocationState>()

  useEffect(() => {
    if (submitSignInSuccess && !submitServerRequest)
      history.push({ pathname: "/" });
  }, [submitSignInSuccess, submitServerRequest]);

  const signIn = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(
      dispatchSignIn({
        email: email,
        password: pwd,
      })
    );
  };

  if (user) {
    console.log(location.state.from);
    return (
      <Redirect
        to={ location.state.from || '/' }
      />
    );
  }


  return (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Вход</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={email}
            name={"email"}
            placeholder="E-mail"
            size="default"
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <form className={`${styles.inputContainer} mb-6`}>
          <PasswordInput
            value={pwd}
            name={"password"}
            size="default"
            onChange={(e) => setPwd(e.target.value)}
          />
        </form>
        <Button onClick={(e) => signIn(e)} type="primary" size="large">
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
  );
};
