import { SUBMIT_USER_EMAIL_REQUEST, SUBMIT_USER_EMAIL_SUCCESS, TUserActions } from "../actions/user";

export type TUserState = {
  email: null | string
  submitUserEmailRequest: boolean,
  submitUserEmailFailed: boolean,
  submitUserEmailSuccess: boolean,
  submitUserEmailError: null | number,
}

const initialState: TUserState = {
  email: null,
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
      return {
        ...state,
        submitUserEmailFailed: false,
        email: action.,
        submitOrderRequest: false,
        submitOrderSuccess: true,
      };
    }
    case SUBMIT_ORDER_FAILED: {
      return {
        ...initialState,
        submitOrderFailed: true,
        submitOrderError: action.error,
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        submitOrderSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
