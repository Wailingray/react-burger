import { AppDispatch, AppThunk } from "../..";
import {
  registerRequest,
  submitResetPwd,
  submitUserEmail,
} from "../../components/api/api";
import {
  TRegisterBody,
  TResetPwdBody,
  TSuccessfulRegisterReply,
  TSuccessfulReply,
} from "../../utils/types";

export const SUBMIT_USER_EMAIL_REQUEST: "SUBMIT_USER_EMAIL_REQUEST" =
  "SUBMIT_USER_EMAIL_REQUEST";
export const SUBMIT_USER_EMAIL_SUCCESS: "SUBMIT_USER_EMAIL_SUCCESS" =
  "SUBMIT_USER_EMAIL_SUCCESS";
export const SUBMIT_USER_EMAIL_FAILED: "SUBMIT_USER_EMAIL_FAILED" =
  "SUBMIT_USER_EMAIL_FAILED";
export const SUBMIT_PWD_RESET_REQUEST: "SUBMIT_PWD_RESET_REQUEST" =
  "SUBMIT_PWD_RESET_REQUEST";
export const SUBMIT_PWD_RESET_SUCCESS: "SUBMIT_PWD_RESET_SUCCESS" =
  "SUBMIT_PWD_RESET_SUCCESS";
export const SUBMIT_PWD_RESET_FAILED: "SUBMIT_PWD_RESET_FAILED" =
  "SUBMIT_PWD_RESET_FAILED";
export const SUBMIT_REGISTER_REQUEST: "SUBMIT_REGISTER_REQUEST" =
  "SUBMIT_REGISTER_REQUEST";
export const SUBMIT_REGISTER_SUCCESS: "SUBMIT_REGISTER_SUCCESS" =
  "SUBMIT_REGISTER_SUCCESS";
export const SUBMIT_REGISTER_FAILED: "SUBMIT_REGISTER_FAILED" =
  "SUBMIT_REGISTER_FAILED";

export interface ISubmitUserEmailRequest {
  readonly type: typeof SUBMIT_USER_EMAIL_REQUEST;
}

export interface ISubmitUserEmailSuccess {
  readonly type: typeof SUBMIT_USER_EMAIL_SUCCESS;
  reply: TSuccessfulReply;
}

export interface ISubmitUserEmailFailed {
  readonly type: typeof SUBMIT_USER_EMAIL_FAILED;
  readonly error: number;
}

export interface ISubmitResetPwdRequest {
  readonly type: typeof SUBMIT_PWD_RESET_REQUEST;
}

export interface ISubmitResetPwdSuccess {
  readonly type: typeof SUBMIT_PWD_RESET_SUCCESS;
  reply: TSuccessfulReply;
}

export interface ISubmitResetPwdFailed {
  readonly type: typeof SUBMIT_PWD_RESET_FAILED;
  readonly error: number;
}

export interface ISubmitRegisterRequest {
  readonly type: typeof SUBMIT_REGISTER_REQUEST;
}

export interface ISubmitRegisterSuccess {
  readonly type: typeof SUBMIT_REGISTER_SUCCESS;
  reply: TSuccessfulRegisterReply;
}

export interface ISubmitRegisterFailed {
  readonly type: typeof SUBMIT_REGISTER_FAILED;
  readonly error: number;
}

export type TUserActions =
  | ISubmitUserEmailRequest
  | ISubmitUserEmailFailed
  | ISubmitUserEmailSuccess
  | ISubmitResetPwdRequest
  | ISubmitResetPwdSuccess
  | ISubmitResetPwdFailed
  | ISubmitRegisterRequest
  | ISubmitRegisterSuccess
  | ISubmitRegisterFailed;

export const submitRegisterRequest = (): ISubmitRegisterRequest => ({
  type: SUBMIT_REGISTER_REQUEST,
});

export const submitRegisterSuccess = (
  reply: TSuccessfulRegisterReply
): ISubmitRegisterSuccess => ({
  type: SUBMIT_REGISTER_SUCCESS,
  reply,
});

export const submitRegisterFailed = (error: number): ISubmitRegisterFailed => ({
  type: SUBMIT_REGISTER_FAILED,
  error,
});

export const submitUserEmailRequest = (): ISubmitUserEmailRequest => ({
  type: SUBMIT_USER_EMAIL_REQUEST,
});

export const submitUserEmailSuccess = (
  reply: TSuccessfulReply
): ISubmitUserEmailSuccess => ({
  type: SUBMIT_USER_EMAIL_SUCCESS,
  reply,
});

export const submitUserEmailFailed = (
  error: number
): ISubmitUserEmailFailed => ({
  type: SUBMIT_USER_EMAIL_FAILED,
  error,
});

export const submitResetPwdRequest = (): ISubmitResetPwdRequest => ({
  type: SUBMIT_PWD_RESET_REQUEST,
});

export const submitResetPwdSuccess = (
  reply: TSuccessfulReply
): ISubmitResetPwdSuccess => ({
  type: SUBMIT_PWD_RESET_SUCCESS,
  reply,
});

export const submitResetPwdFailed = (error: number): ISubmitResetPwdFailed => ({
  type: SUBMIT_PWD_RESET_FAILED,
  error,
});

export const dispatchUserEmail: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(submitUserEmailRequest());
    submitUserEmail(email)
      .then((res) => {
        dispatch(submitUserEmailSuccess(res));
      })
      .catch((err) => {
        dispatch(submitUserEmailFailed(err));
      });
  };

export const dispatchPwdReset: AppThunk =
  (request: TResetPwdBody) => (dispatch: AppDispatch) => {
    dispatch(submitResetPwdRequest());
    submitResetPwd(request)
      .then((res) => {
        dispatch(submitResetPwdSuccess(res));
      })
      .catch((err) => {
        dispatch(submitResetPwdFailed(err));
      });
  };

/* export const dispatchRegister: AppThunk =
  (request: TRegisterBody) => (dispatch: AppDispatch) => {
    dispatch(submitRegisterRequest());
    registerRequest(request);
    const data = await loginRequest(form)
      .then((res) => {
        let authToken;
        res.headers.forEach((header) => {
          if (header.indexOf("Bearer") === 0) {
            authToken = header.split("Bearer ")[1];
          }
        });
        if (authToken) {
          setCookie("token", authToken);
        }
        return res.json();
      })
      .then((data) => data);

    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
    }
  }; */
