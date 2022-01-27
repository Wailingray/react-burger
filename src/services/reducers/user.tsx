import {
  SET_USER,
  SUBMIT_CHANGE_CREDENTIALS_SUCCESS,
  SUBMIT_LOGOUT_SUCCESS,
  SUBMIT_PWD_RESET_SUCCESS,
  SUBMIT_SERVER_FAILED,
  SUBMIT_SERVER_REQUEST,
  SUBMIT_SIGN_IN_SUCCESS,
  SUBMIT_UPDATE_TOKENS_SUCCESS,
  SUBMIT_USER_EMAIL_SUCCESS,
  TUserActions,
} from "../actions/user";
import { TUser } from "../utils/types";

export type TUserState = {
  submitServerRequest: boolean;
  submitServerFailed: boolean;
  submitServerError: number | null;
  submitUserEmailSuccess: boolean;
  submitLogoutSuccess: boolean;
  submitSignInSuccess: boolean;
  submitUpdateTokensSuccess: boolean;
  submitChangeCredentialsSuccess: boolean;
  submitPwdResetSuccess: boolean;
  user: TUser | null;
};

const initialState: TUserState = {
  submitServerRequest: false,
  submitServerFailed: false,
  submitServerError: null,
  submitUpdateTokensSuccess: false,
  submitLogoutSuccess: false,
  submitUserEmailSuccess: false,
  submitSignInSuccess: false,
  submitChangeCredentialsSuccess: false,
  submitPwdResetSuccess: false,
  user: null,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SUBMIT_SERVER_REQUEST: {
      return { ...state, submitServerRequest: true };
    }
    case SUBMIT_USER_EMAIL_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitUserEmailSuccess: true,
      };
    }
    case SUBMIT_SERVER_FAILED: {
      return {
        ...state,
        submitServerFailed: true,
        submitServerError: action.error,
      };
    }
    case SUBMIT_PWD_RESET_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitPwdResetSuccess: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: {
          email: action.user.email,
          name: action.user.name,
        },
      };
    }
    case SUBMIT_SIGN_IN_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitSignInSuccess: true,
        submitLogoutSuccess: false,
      };
    }
    case SUBMIT_UPDATE_TOKENS_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitUpdateTokensSuccess: true,
      };
    }
    case SUBMIT_LOGOUT_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitLogoutSuccess: true,
        submitChangeCredentialsSuccess: false,
        user: initialState.user,
      };
    }
    case SUBMIT_CHANGE_CREDENTIALS_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitChangeCredentialsSuccess: true,
      };
    }
    default: {
      return state;
    }
  }
};
