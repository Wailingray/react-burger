import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import {
  dispatchChangeCredentials,
  dispatchGetUser,
  dispatchLogout,
  submitChangeCredentialsSuccess,
} from "../services/actions/user";
import { Loader } from "../components/loader/loader";

export const ProfilePage = () => {

  const [loaded, setIsLoaded] = useState(false)

  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
  } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(dispatchGetUser());
  }, []);

  useEffect(() => {
    if (user) {
      setEmailValue(user.email);
      setNameValue(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true)
  }, [submitGetUserSuccess, foundNoTokens]);

  useEffect(() => {
    if (submitLogoutSuccess) history.push({ pathname: "/login" });
  }, [submitLogoutSuccess]);

  useEffect(() => {
    return () => {
      setJustUpdated(false);
    };
  }, []);


  const handleLogout = () => {
    dispatch(dispatchLogout());
  };

  const resetInput = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    if (user) {
      setEmailValue(user.email);
      setNameValue(user.name);
    }
    else {
      setEmailValue('');
      setNameValue('');
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(
      dispatchChangeCredentials({
        email: emailValue,
        password: pwdValue,
        name: nameValue,
      })
    );
    setJustUpdated(true)
  };



  const [justUpdated, setJustUpdated] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  return loaded ? (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
            activeClassName={`${styles.activeLink}`}
          >
            Профиль
          </NavLink>
          <NavLink
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile/orders"}
            activeClassName={`${styles.activeLink}`}
          >
            История заказов
          </NavLink>
          <button
            className={`${styles.logoutButton} text text_type_main-medium`}
            onClick={() => handleLogout()}
          >
            Выход
          </button>
          <p
            className={`${styles.comment} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <form className={styles.form} action="">
          <form className={`${styles.inputContainer} mb-6`}>
            <Input
              value={nameValue}
              name={"name"}
              placeholder="Имя"
              size="default"
              onChange={(e) => setNameValue(e.target.value)}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <EmailInput
              value={emailValue}
              name={"email"}
              size="default"
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </form>
          <form className={`${styles.inputContainer} mb-6`}>
            <PasswordInput
              value={pwdValue}
              name={"password"}
              size="default"
              onChange={(e) => setPwdValue(e.target.value)}
            />
          </form>
          {submitChangeCredentialsSuccess && justUpdated &&(
            <p className="text text_type_main-default text_color_inactive">
              Данные успешно изменены!
            </p>
          )}
          <div className={`${styles.buttonsContainer} mt-6`}>
            <Button type="primary" onClick={(e) => resetInput(e)} size="medium">
              Отмена
            </Button>
            <Button
              type="primary"
              onClick={(e) => handleSubmit(e)}
              size="medium"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (<Loader />)
};
