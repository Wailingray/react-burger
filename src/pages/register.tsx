import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { dispatchGetUser, dispatchRegister } from "../services/actions/user";
import { TLocationState } from "../services/utils/interfaces";
import { Loader } from "../components/loader/loader";


export const RegisterPage: React.FC = () => {

  const history = useHistory()
  const dispatch = useAppDispatch()
  const location = useLocation<TLocationState>();
  const [loaded, setIsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) dispatch(dispatchGetUser());
  }, []);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true)
  }, [submitGetUserSuccess, foundNoTokens]);


  useEffect(() => {
    if (user) {
      if (location.state) history.push({ pathname: `${location.state.from.pathname}`});
      else return history.push({ pathname: "/" });
    }
  }, [user]);



  const handleSubmit = (e:  React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    dispatch(dispatchRegister({
      email: email,
      password: pwd,
      name: name,
    }))
  }

  return loaded ? (
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} action="">
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={name}
            name={"name"}
            size="default"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
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
        <Button type="primary" size="large" onClick={(e) => handleSubmit(e)}>
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
  ) : (<Loader />)
};
