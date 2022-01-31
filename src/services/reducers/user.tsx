import {
  SUBMIT_CAN_RESET_PWD,
  NO_TOKENS,
  SET_USER,
  SUBMIT_CHANGE_CREDENTIALS_SUCCESS,
  SUBMIT_GET_USER_SUCCESS,
  SUBMIT_LOGOUT_SUCCESS,
  SUBMIT_PWD_RESET_SUCCESS,
  SUBMIT_SERVER_FAILED,
  SUBMIT_SERVER_REQUEST,
  SUBMIT_SIGN_IN_SUCCESS,
  SUBMIT_UPDATE_TOKENS_SUCCESS,
  SUBMIT_USER_EMAIL_SUCCESS,
  TUserActions,
  SUBMIT_CANNOT_RESET_PWD,
  REMOVE_SERVER_ERROR,
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
  submitGetUserSuccess: boolean;
  submitChangeCredentialsSuccess: boolean;
  submitPwdResetSuccess: boolean;
  canResetPwd: boolean;
  foundNoTokens: boolean;
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
  submitGetUserSuccess: false,
  submitChangeCredentialsSuccess: false,
  submitPwdResetSuccess: false,
  foundNoTokens: false,
  canResetPwd: false,
  user: null,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SUBMIT_SERVER_REQUEST: {
      return { ...state, submitServerRequest: true, foundNoTokens: false };
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
    case SUBMIT_GET_USER_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitGetUserSuccess: true,
      };
    }
    case SUBMIT_CAN_RESET_PWD: {
      console.log(123);
      return {
        ...state,
        canResetPwd: true,
      }
    }
    case SUBMIT_CANNOT_RESET_PWD: {
      return {
        ...state,
        canResetPwd: false,
        submitPwdResetSuccess: false,
      }
    }
    case NO_TOKENS: {
      return {
        ...state,
        foundNoTokens: true,
      };
    }
    case REMOVE_SERVER_ERROR: {
      return {
        ...state,
        submitServerFailed: false,
      }
    }
    default: {
      return state;
    }
  }
};
