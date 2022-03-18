import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  dispatchGetUser,
  dispatchRegister,
  removeServerError,
} from "../../services/actions/user";
import { TLocationState } from "../../services/utils/interfaces";
import { Loader } from "../../components/loader/loader";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  validateInput,
} from "../../services/validations/user-validation";

export const RegisterPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();

  const [loaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
    submitServerFailed,
    submitServerError,
  } = useAppSelector((state) => state.user);

  //Если есть нужный токен в куках, то при заходе на страницу фетчится юзер
  /* useEffect(() => {
    if (!user) dispatch(dispatchGetUser());
    return () => {
      dispatch(removeServerError());
    };
  }, []);
 */
  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens ||!user ) setIsLoaded(true);
  }, [submitGetUserSuccess, foundNoTokens]);

  useEffect(() => {
    if (user) {
      if (location.state)
        history.push({ pathname: `${location.state.from.pathname}` });
      else return history.push({ pathname: "/" });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdError || emailError || nameError) return null;
    else {
      dispatch(removeServerError());
      dispatch(
        dispatchRegister({
          email: email,
          password: pwd,
          name: name,
        })
      );
    }
  };

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
    <div className={`${styles.formContainer}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
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
          disabled={
            pwdError || emailError || nameError || !email || !name || !pwd
          }
        >
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
  ) : (
    <Loader />
  );
};
