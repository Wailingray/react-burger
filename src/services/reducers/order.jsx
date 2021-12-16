import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_FAILED,
  SUBMIT_ORDER_SUCCESS,
  ORDER_RESET
} from "../actions/order";

const initialState = {
  order: {},
  submitOrderRequest: false,
  submitOrderFailed: false,
  submitOrderSuccess: false,
  submitOrderError: ''
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return { ...state, submitOrderRequest: true };
    }
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        submitOrderFailed: false,
        order: action,
        submitOrderRequest: false,
        submitOrderSuccess: true
      };
    }
    case SUBMIT_ORDER_FAILED: {
      return {
        ...initialState,
        submitOrderFailed: true,
        submitOrderError: action.error
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
}
