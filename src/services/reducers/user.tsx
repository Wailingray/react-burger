import {
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
};

const initialState: TUserState = {
  submitUserEmailRequest: false,
  submitUserEmailFailed: false,
  submitUserEmailSuccess: false,
  submitUserEmailError: null,
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
      console.log(action.reply)
      return {
        ...state,
        submitUserEmailFailed: false,
        submitUserEmailRequest: false,
        submitUserEmailSuccess: true,
      };
    }
    case SUBMIT_USER_EMAIL_FAILED: {
      return {
        ...initialState,
        submitUserEmailFailed: true,
        submitUserEmailError: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
