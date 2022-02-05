import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  dispatchChangeCredentials,
  dispatchGetUser,
  dispatchLogout,
  removeServerError,
  submitChangeCredentialsSuccess,
} from "../../services/actions/user";
import { Loader } from "../../components/loader/loader";
import { ProfileNavBar } from "../../components/profile-nav/profile-nav";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  validateInput,
} from "../../services/validations/user-validation";

export const ProfilePage = () => {
  const [loaded, setIsLoaded] = useState(false);

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
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true);
  }, [submitGetUserSuccess, foundNoTokens]);

  useEffect(() => {
    if (submitLogoutSuccess) history.push({ pathname: "/login" });
  }, [submitLogoutSuccess]);

  useEffect(() => {
    return () => {
      setJustUpdated(false);
      dispatch(removeServerError());
    };
  }, []);

  const resetInput = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (user) {
      setEmail(user.email);
      setName(user.name);
    } else {
      setEmail("");
      setName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdError || emailError || nameError) return null;
    else
      dispatch(
        dispatchChangeCredentials({
          email: email,
          password: pwd,
          name: name,
        })
      );
    setJustUpdated(true);
  };

  const [justUpdated, setJustUpdated] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const changeEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateInput(emailSchema, setEmailError, email);
  };

  const changeNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateInput(nameSchema, setNameError, name);
  };

  const changePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
    validateInput(passwordSchema, setPwdError, pwd);
  };

  return loaded ? (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <ProfileNavBar />
          <p
            className={`${styles.comment} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.inputContainer} mb-6`}>
            <Input
              value={name}
              name={"name"}
              error={nameError}
              errorText="Введите валидное имя!"
              placeholder="Имя"
              size="default"
              onChange={(e) => changeNameField(e)}
              onBlur={() => validateInput(nameSchema, setNameError, name)}
            />
          </div>
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
          {submitChangeCredentialsSuccess && justUpdated && (
            <p className="text text_type_main-default text_color_inactive">
              Данные успешно изменены!
            </p>
          )}
          <div className={`${styles.buttonsContainer} mt-6`}>
            <Button type="secondary" size="medium">
              Сохранить
            </Button>
            <Button
              type="secondary"
              size="medium"
              onClick={(e) => resetInput(e)}
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
