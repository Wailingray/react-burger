import {
  SET_USER,
  SUBMIT_CHANGE_CREDENTIALS_SUCCESS,
  SUBMIT_LOGOUT_SUCCESS,
  SUBMIT_PWD_RESET_SUCCESS,
  SUBMIT_SERVER_FAILED,
  SUBMIT_SERVER_REQUEST,
  SUBMIT_SIGN_IN_SUCCESS,
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
  submitChangeCredentialsSuccess: boolean;
  submitPwdResetSuccess: boolean;
  user: TUser;
};

const initialState: TUserState = {
  submitServerRequest: false,
  submitServerFailed: false,
  submitServerError: null,
  submitLogoutSuccess: false,
  submitUserEmailSuccess: false,
  submitSignInSuccess: false,
  submitChangeCredentialsSuccess: false,
  submitPwdResetSuccess: false,
  user: {
    email: "",
    name: "",
  },
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
    case SUBMIT_LOGOUT_SUCCESS: {
      return {
        ...state,
        submitServerFailed: false,
        submitServerRequest: false,
        submitLogoutSuccess: true,
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
