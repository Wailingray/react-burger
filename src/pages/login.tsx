import React, { useCallback, useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchGetUser, dispatchSignIn } from "../services/actions/user";
import { TLocationState } from "../services/utils/interfaces";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dispatchGetUser());
  }, []);

  const { user } = useAppSelector((state) => state.user);

  const location = useLocation<TLocationState>();

  const signIn = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(
      dispatchSignIn({
        email: email,
        password: pwd,
      })
    );
  };

/*   useCallback(() => { */
    if (user) {
      if (location.state) return <Redirect to={location.state.from} />;
      else return <Redirect to={"/"} />;
    }
/*   }, [user]); */

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
