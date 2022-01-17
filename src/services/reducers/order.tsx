import { TOrder } from "../../utils/types";
import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_FAILED,
  SUBMIT_ORDER_SUCCESS,
  ORDER_RESET,
  TOrderActions,
} from "../actions/order";

type TOrderState = {
  order: TOrder | null;
  submitOrderRequest: boolean;
  submitOrderFailed: boolean;
  submitOrderSuccess: boolean;
  submitOrderError: number | null;
};

const initialState: TOrderState = {
  order: null,
  submitOrderRequest: false,
  submitOrderFailed: false,
  submitOrderSuccess: false,
  submitOrderError: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) : TOrderState => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return { ...state, submitOrderRequest: true };
    }
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        submitOrderFailed: false,
        order: action.order,
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
