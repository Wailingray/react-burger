import { AppDispatch, AppThunk } from "../..";
import { submitOrder, updateTokenRequest } from "../../components/api/api";
import {
  TOrder,
  TOrderModalProps,
  TServerOrder,
  TSuccessfulUpdateTokensReply,
} from "../utils/types";
import { getCookie, setTokens } from "../utils/utils";
import { resetConstructor } from "./ingredients";
import {
  setNoTokens,
  submitServerFailed,
  submitServerRequest,
  submitUpdateTokensSuccess,
} from "./user";

export const SUBMIT_ORDER_REQUEST: "SUBMIT_ORDER_REQUEST" =
  "SUBMIT_ORDER_REQUEST";
export const SUBMIT_ORDER_SUCCESS: "SUBMIT_ORDER_SUCCESS" =
  "SUBMIT_ORDER_SUCCESS";
export const SUBMIT_ORDER_FAILED: "SUBMIT_ORDER_FAILED" = "SUBMIT_ORDER_FAILED";
export const ORDER_RESET: "ORDER_RESET" = "ORDER_RESET";
export const SEND_ORDER_TO_MODAL: "SEND_ORDER_TO_MODAL" = "SEND_ORDER_TO_MODAL";
export const RESET_ORDER_POPUP: "RESET_ORDER_POPUP" = "RESET_ORDER_POPUP";

export interface IOrderPopupReset {
  readonly type: typeof RESET_ORDER_POPUP;
}

export interface ISendOrderToModal {
  readonly type: typeof SEND_ORDER_TO_MODAL;
  readonly order: TServerOrder;
}

export interface ISubmitOrderRequest {
  readonly type: typeof SUBMIT_ORDER_REQUEST;
}

export interface ISubmitOrderSuccess {
  readonly type: typeof SUBMIT_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface ISubmitOrderFailed {
  readonly type: typeof SUBMIT_ORDER_FAILED;
  readonly error: number;
}

export interface IOrderReset {
  readonly type: typeof ORDER_RESET;
}

export type TOrderActions =
  | ISubmitOrderRequest
  | ISubmitOrderSuccess
  | ISubmitOrderFailed
  | ISendOrderToModal
  | IOrderPopupReset
  | IOrderReset;

export const sendOrderToModal = (
  order: TServerOrder
): ISendOrderToModal => ({
  type: SEND_ORDER_TO_MODAL,
  order,
});

export const submitOrderRequest = (): ISubmitOrderRequest => ({
  type: SUBMIT_ORDER_REQUEST,
});

export const submitOrderSuccess = (order: TOrder): ISubmitOrderSuccess => ({
  type: SUBMIT_ORDER_SUCCESS,
  order,
});

export const submitOrderFailed = (error: number): ISubmitOrderFailed => ({
  type: SUBMIT_ORDER_FAILED,
  error,
});

export const resetOrder = (): IOrderReset => ({
  type: ORDER_RESET,
});

export const orderPopupReset = (): IOrderPopupReset => ({
  type: RESET_ORDER_POPUP,
});

export const dispatchOrderUsual = (
  userOrder: string[],
  accessToken: string,
  dispatch: AppDispatch
) => {
  dispatch(submitOrderRequest());
  submitOrder(userOrder, accessToken)
    .then((res) => {
      dispatch(submitOrderSuccess(res));
      dispatch(resetConstructor());
    })
    .catch((err) => {
      dispatch(submitOrderFailed(err));
    });
};

export const dispatchOrderWithUpdate = (
  userOrder: string[],
  refreshToken: string,
  dispatch: AppDispatch
) => {
  dispatch(submitServerRequest());
  updateTokenRequest(refreshToken)
    .then((res: TSuccessfulUpdateTokensReply) => {
      dispatch(submitUpdateTokensSuccess());
      setTokens(res);
      let accessToken = getCookie("accessToken");
      if (accessToken) {
        dispatchOrderUsual(userOrder, accessToken, dispatch);
      }
    })
    .catch((err) => {
      dispatch(submitServerFailed(err));
    });
};

export const dispatchOrder: AppThunk =
  (userOrder: string[]) => (dispatch: AppDispatch) => {
    dispatch(submitServerRequest());
    let refreshToken = getCookie("refreshToken");
    let accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatchOrderUsual(userOrder, accessToken, dispatch);
    } else if (refreshToken)
      dispatchOrderWithUpdate(userOrder, refreshToken, dispatch);
    else dispatch(setNoTokens());
  };
