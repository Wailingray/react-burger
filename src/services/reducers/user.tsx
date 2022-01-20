import {
  SUBMIT_PWD_RESET_FAILED,
  SUBMIT_PWD_RESET_REQUEST,
  SUBMIT_PWD_RESET_SUCCESS,
  SUBMIT_USER_EMAIL_FAILED,
  SUBMIT_USER_EMAIL_REQUEST,
  SUBMIT_USER_EMAIL_SUCCESS,
  TUserActions,
} from "../actions/user";

export type TUserState = {
  submitUserEmailRequest: boolean;
  submitUserEmailFailed: boolean;
  submitUserEmailSuccess: boolean;
  submitUserEmailError: null | number;
  submitPwdResetRequest: boolean;
  submitPwdResetFailed: boolean;
  submitPwdResetSuccess: boolean;
  submitPwdResetError: null | number;
};

const initialState: TUserState = {
  submitUserEmailRequest: false,
  submitUserEmailFailed: false,
  submitUserEmailSuccess: false,
  submitUserEmailError: null,
  submitPwdResetRequest: false,
  submitPwdResetFailed: false,
  submitPwdResetSuccess: false,
  submitPwdResetError: null,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SUBMIT_USER_EMAIL_REQUEST: {
      return { ...state, submitUserEmailRequest: true };
    }
    case SUBMIT_USER_EMAIL_SUCCESS: {
      return {
        ...state,
        submitUserEmailFailed: false,
        submitUserEmailRequest: false,
        submitUserEmailSuccess: true,
      };
    }
    case SUBMIT_USER_EMAIL_FAILED: {
      return {
        ...state,
        submitUserEmailFailed: true,
        submitUserEmailError: action.error,
      };
    }
    case SUBMIT_PWD_RESET_REQUEST: {
      return { ...state, submitPwdResetRequest: true };
    }
    case SUBMIT_PWD_RESET_SUCCESS: {
      return {
        ...state,
        submitPwdResetFailed: false,
        submitPwdResetRequest: false,
        submitPwdResetSuccess: true,
      };
    }
    case SUBMIT_PWD_RESET_FAILED: {
      return {
        ...state,
        submitPwdResetFailed: true,
        submitPwdResetError: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
