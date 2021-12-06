import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_FAILED,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";

const initialState = {
  order: {},
  SubmitOrderRequest: false,
  SubmitOrderFailed: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return { ...state, SubmitOrderRequest: true };
    }
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        SubmitOrderFailed: false,
        order: action.order,
        SubmitOrderRequest: false,
      };
    }
    case SUBMIT_ORDER_FAILED: {
      return {
        ...state,
        SubmitOrderFailed: true,
        SubmitOrderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
}
