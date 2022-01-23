import { AppDispatch, AppThunk } from "../..";
import {
  getUserRequest,
  registerRequest,
  signInRequest,
  submitResetPwd,
  submitUserEmail,
  updateTokenRequest,
} from "../../components/api/api";
import {
  TRegisterBody,
  TResetPwdBody,
  TSignInBody,
  TSuccessfulGetUserReply,
  TSuccessfulRegisterReply,
  TSuccessfulReply,
  TUser,
} from "../utils/types";
import { setCookie } from "../utils/utils";

export const SUBMIT_SERVER_REQUEST: "SUBMIT_SERVER_REQUEST" =
  "SUBMIT_SERVER_REQUEST";
export const SUBMIT_USER_EMAIL_SUCCESS: "SUBMIT_USER_EMAIL_SUCCESS" =
  "SUBMIT_USER_EMAIL_SUCCESS";
export const SUBMIT_SERVER_FAILED: "SUBMIT_SERVER_FAILED" =
  "SUBMIT_SERVER_FAILED";
export const SUBMIT_PWD_RESET_SUCCESS: "SUBMIT_PWD_RESET_SUCCESS" =
  "SUBMIT_PWD_RESET_SUCCESS";
export const SUBMIT_REGISTER_SUCCESS: "SUBMIT_REGISTER_SUCCESS" =
  "SUBMIT_REGISTER_SUCCESS";
export const SUBMIT_SIGN_IN_SUCCESS: "SUBMIT_SIGN_IN_SUCCESS" =
  "SUBMIT_SIGN_IN_SUCCESS";
export const SUBMIT_GET_USER_SUCCESS: "SUBMIT_GET_USER_SUCCESS" =
  "SUBMIT_GET_USER_SUCCESS";
export const SET_USER: "SET_USER" = "SET_USER";

export interface ISubmitServerRequest {
  readonly type: typeof SUBMIT_SERVER_REQUEST;
}

export interface ISubmitUserEmailSuccess {
  readonly type: typeof SUBMIT_USER_EMAIL_SUCCESS;
  reply: TSuccessfulReply;
}

export interface ISubmitServerFailed {
  readonly type: typeof SUBMIT_SERVER_FAILED;
  readonly error: number;
}

export interface ISubmitResetPwdSuccess {
  readonly type: typeof SUBMIT_PWD_RESET_SUCCESS;
  reply: TSuccessfulReply;
}

export interface ISubmitRegisterSuccess {
  readonly type: typeof SUBMIT_REGISTER_SUCCESS;
  reply: TSuccessfulRegisterReply;
}

export interface ISubmitSignInSuccess {
  readonly type: typeof SUBMIT_SIGN_IN_SUCCESS;
  reply: TSuccessfulRegisterReply;
}

export interface ISubmitGetUserSuccess {
  readonly type: typeof SUBMIT_GET_USER_SUCCESS;
}

export interface ISetUser {
  readonly type: typeof SET_USER;
  user: TUser;
}

export type TUserActions =
  | ISubmitServerRequest
  | ISubmitServerFailed
  | ISubmitUserEmailSuccess
  | ISubmitResetPwdSuccess
  | ISubmitRegisterSuccess
  | ISubmitSignInSuccess
  | ISubmitGetUserSuccess
  | ISetUser;

export const submitRegisterSuccess = (
  reply: TSuccessfulRegisterReply
): ISubmitRegisterSuccess => ({
  type: SUBMIT_REGISTER_SUCCESS,
  reply,
});

export const submitServerRequest = (): ISubmitServerRequest => ({
  type: SUBMIT_SERVER_REQUEST,
});

export const submitUserEmailSuccess = (
  reply: TSuccessfulReply
): ISubmitUserEmailSuccess => ({
  type: SUBMIT_USER_EMAIL_SUCCESS,
  reply,
});

export const submitServerFailed = (error: number): ISubmitServerFailed => ({
  type: SUBMIT_SERVER_FAILED,
  error,
});

export const submitResetPwdSuccess = (
  reply: TSuccessfulReply
): ISubmitResetPwdSuccess => ({
  type: SUBMIT_PWD_RESET_SUCCESS,
  reply,
});

export const submitSignInSuccess = (
  reply: TSuccessfulRegisterReply
): ISubmitSignInSuccess => ({
  type: SUBMIT_SIGN_IN_SUCCESS,
  reply,
});

export const submitGetUserSuccess = (): ISubmitGetUserSuccess => ({
  type: SUBMIT_GET_USER_SUCCESS,
});

export const setUser = (user: TUser): ISetUser => ({
  type: SET_USER,
  user,
});

export const dispatchUserEmail: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    submitUserEmail(email)
      .then((res) => {
        dispatch(submitUserEmailSuccess(res));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchPwdReset: AppThunk =
  (request: TResetPwdBody) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    submitResetPwd(request)
      .then((res) => {
        dispatch(submitResetPwdSuccess(res));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchRegister: AppThunk =
  (request: TRegisterBody) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    registerRequest(request)
      .then((res) => {
        dispatch(submitRegisterSuccess(res));
        let accessToken, refreshToken;
        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1];
        }
        refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 600 });
          setCookie("refreshToken", refreshToken);
        }
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchSignIn: AppThunk =
  (request: TSignInBody) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    signInRequest(request)
      .then((res) => {
        dispatch(submitSignInSuccess(res));
        console.log(res);
        let accessToken, refreshToken;
        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1];
        }
        refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 100 });
          setCookie("refreshToken", refreshToken);
          console.log(document.cookie);
        }
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchGetUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(submitServerRequest());
  getUserRequest()
    .then((res: TSuccessfulGetUserReply) => {
      dispatch(submitGetUserSuccess());
      dispatch(setUser(res.user));
    })
    .catch((err) => {
      try {
        dispatch(submitServerRequest());
        updateTokenRequest().then(() => {
          dispatchGetUser();
        });
      } catch (err: any) {
        console.log(err);
      }
    });
};
