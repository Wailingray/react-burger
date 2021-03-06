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
  removeServerError,
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

  //Если есть нужный токен в куках, то при заходе на страницу фетчится юзер
  useEffect(() => {
    if (!user) dispatch(dispatchGetUser());
    return () => {
      dispatch(removeServerError());
    };
  }, []);

  useEffect(() => {
    if (user || !canResetPwd) history.push({ pathname: "/login" });
    return () => {
      dispatch(removeServerError());
      dispatch(submitCannotResetPwd());
    };
  }, [user, canResetPwd, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdError || codeError) return null;
    else {
      dispatch(removeServerError());
      dispatch(
        dispatchPwdReset({
          password: pwd,
          token: code,
        })
      );
    }
  };

  useEffect(() => {
    if (submitPwdResetSuccess) {
      setTimeout(() => {
        history.push({ pathname: "/login" });
      }, 3000);
    }
  }, [submitPwdResetSuccess]);

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
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
        <div className={`${styles.inputContainer} mb-6`}>
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
        </div>
        {submitPwdResetSuccess && (
          <>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Данные успешно изменены!
            </p>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Вы будете перенаправлены на страницу авотризации...
            </p>
          </>
        )}
        {submitServerFailed && (
          <p className="text text_type_main-default text_color_inactive mb-6">
            Произошла ошибка! Код ошибки: {submitServerError}
          </p>
        )}
        <Button
          type="primary"
          size="large"
          disabled={pwdError || codeError || !code || !pwd}
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
