import { useDispatch } from "react-redux";
import { AppDispatch, AppThunk } from "../..";


import {
  changeCredentialsRequest,
  getUserRequest,
  logoutRequest,
  registerRequest,
  signInRequest,
  submitResetPwd,
  submitUserEmail,
  updateTokenRequest,
} from "../../components/api/api";
import { useAppDispatch } from "../hooks/hooks";
import {
  TRegisterBody,
  TResetPwdBody,
  TSignInBody,
  TSuccessfulGetUserReply,
  TSuccessfulRegisterReply,
  TSuccessfulReply,
  TSuccessfulUpdateTokensReply,
  TUser,
} from "../utils/types";
import { deleteCookie, getCookie, setCookie, setTokens } from "../utils/utils";


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
export const SUBMIT_UPDATE_TOKENS_SUCCESS: "SUBMIT_UPDATE_TOKENS_SUCCESS" =
  "SUBMIT_UPDATE_TOKENS_SUCCESS";
export const SUBMIT_LOGOUT_SUCCESS: "SUBMIT_LOGOUT_SUCCESS" =
  "SUBMIT_LOGOUT_SUCCESS";
export const SUBMIT_CHANGE_CREDENTIALS_SUCCESS: "SUBMIT_CHANGE_CREDENTIALS_SUCCESS" =
  "SUBMIT_CHANGE_CREDENTIALS_SUCCESS";
export const REMOVE_USER: "REMOVE_USER" = "REMOVE_USER";
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

export interface ISubmitLogoutSuccess {
  readonly type: typeof SUBMIT_LOGOUT_SUCCESS;
}

export interface ISubmitUpdateTokensSuccess {
  readonly type: typeof SUBMIT_UPDATE_TOKENS_SUCCESS;
}

export interface ISubmitChangeCredentialsSuccess {
  readonly type: typeof SUBMIT_CHANGE_CREDENTIALS_SUCCESS;
}

export interface IRemoveUser {
  readonly type: typeof REMOVE_USER;
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
  | ISubmitLogoutSuccess
  | ISubmitUpdateTokensSuccess
  | IRemoveUser
  | ISubmitChangeCredentialsSuccess
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

export const submitChangeCredentialsSuccess =
  (): ISubmitChangeCredentialsSuccess => ({
    type: SUBMIT_CHANGE_CREDENTIALS_SUCCESS,
  });

export const submitGetUserSuccess = (): ISubmitGetUserSuccess => ({
  type: SUBMIT_GET_USER_SUCCESS,
});

export const submitLogoutSuccess = (): ISubmitLogoutSuccess => ({
  type: SUBMIT_LOGOUT_SUCCESS,
});

export const setUser = (user: TUser): ISetUser => ({
  type: SET_USER,
  user,
});

export const submitUpdateTokensSuccess = (): ISubmitUpdateTokensSuccess => ({
  type: SUBMIT_UPDATE_TOKENS_SUCCESS,
});

export const removeUser = (): IRemoveUser => ({
  type: REMOVE_USER,
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
        setTokens(res);
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchGetUserRequest =
  (accessToken: string, dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    getUserRequest(accessToken)
      .then((res: TSuccessfulGetUserReply) => {
        dispatch(submitGetUserSuccess());
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchUpdateTokensRequest =
  (refreshToken: string, dispatch: AppDispatch)  => {
    dispatch(submitServerRequest());
    console.log('Попали в updTokensRequest');
    updateTokenRequest(refreshToken)
      .then((res: TSuccessfulUpdateTokensReply) => {
        dispatch(submitUpdateTokensSuccess());
        setTokens(res);
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  };

export const dispatchGetUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(submitServerRequest());
  let accessToken = getCookie("accessToken");
  console.log(`access ${accessToken}`)
  if (accessToken) {
    dispatchGetUserRequest(accessToken, dispatch);
  } else {
    let refreshToken = getCookie("refreshToken");
    console.log(`refresh ${refreshToken}`);
    if (refreshToken) {
      dispatchUpdateTokensRequest(refreshToken, dispatch);
      accessToken = getCookie("accessToken");
      if (accessToken) {
        dispatchGetUserRequest(accessToken, dispatch);
      }
    }
  }
};

export const dispatchLogout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(submitServerRequest());
  let refreshToken = getCookie("refreshToken");
  if (refreshToken) {
    logoutRequest(refreshToken)
      .then(() => {
        dispatch(submitLogoutSuccess());
        dispatch(removeUser());
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch((err) => {
        dispatch(submitServerFailed(err));
      });
  }
};

export const dispatchChangeCredentials: AppThunk =
  (request: TRegisterBody) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    let accessToken = getCookie("accessToken");
    if (accessToken) {
      changeCredentialsRequest(accessToken, request)
        .then((res: TSuccessfulGetUserReply) => {
          dispatch(submitChangeCredentialsSuccess());
          dispatch(setUser(res.user));
        })
        .catch((err) => {
          dispatch(submitServerFailed(err));
        });
    } else {
      let refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        dispatch(submitServerRequest());
        updateTokenRequest(refreshToken)
          .then((res) => {
            setTokens(res);
            accessToken = getCookie("accessToken");
            if (accessToken) {
              changeCredentialsRequest(accessToken, request)
                .then((res: TSuccessfulGetUserReply) => {
                  console.log(res);
                  dispatch(submitChangeCredentialsSuccess());
                  dispatch(setUser(res.user));
                })
                .catch((err) => {
                  dispatch(submitServerFailed(err));
                });
            }
          })
          .catch((err) => {
            dispatch(submitServerFailed(err));
          });
      }
    }
  };
