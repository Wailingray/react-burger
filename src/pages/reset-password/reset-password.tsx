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
import {
  codeSchema,
  passwordSchema,
  validateInput,
} from "../../services/validations/user-validation";

export const ResetPasswordPage: React.FC = () => {
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
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
    if (pwdError || codeError) return null;
    else
      dispatch(
        dispatchPwdReset({
          password: pwd,
          token: code,
        })
      );
  };

  const changePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
    validateInput(passwordSchema, setPwdError, pwd);
  };

  const changeCodeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    validateInput(codeSchema, setCodeError, code);
  };

  return (
    <div className={`${styles.formContainer}`}>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form className={`${styles.inputContainer} mb-6`}>
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
        </form>
        <form className={`${styles.inputContainer} mb-6`}>
          <Input
            value={code}
            name={"code"}
            placeholder="Введите код из письма"
            size="default"
            onChange={(e) => changeCodeField(e)}
            error={codeError}
            errorText="Неверный формат кода!"
            onBlur={() => validateInput(codeSchema, setCodeError, code)}
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
          onClick={(e) => handleSubmit(e, pwd, code)}
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
      </div>
    </div>
  );
};
