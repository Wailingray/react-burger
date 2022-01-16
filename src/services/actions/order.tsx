import { AppDispatch, AppThunk } from "../..";
import { submitOrder } from "../../components/api/api";

export const SUBMIT_ORDER_REQUEST: "SUBMIT_ORDER_REQUEST" =
  "SUBMIT_ORDER_REQUEST";
export const SUBMIT_ORDER_SUCCESS: "SUBMIT_ORDER_SUCCESS" =
  "SUBMIT_ORDER_SUCCESS";
export const SUBMIT_ORDER_FAILED: "SUBMIT_ORDER_FAILED" = "SUBMIT_ORDER_FAILED";
export const ORDER_RESET: "ORDER_RESET" = "ORDER_RESET";

export interface ISubmitOrderRequest {
  readonly type: typeof SUBMIT_ORDER_REQUEST;
}

export interface ISubmitOrderSuccess {
  readonly type: typeof SUBMIT_ORDER_SUCCESS;
  readonly order: string[];
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
  | IOrderReset;

export const submitOrderRequest = (): ISubmitOrderRequest => ({
  type: SUBMIT_ORDER_REQUEST,
});

export const submitOrderSuccess = (order: string[]): ISubmitOrderSuccess => ({
  type: SUBMIT_ORDER_SUCCESS,
  order,
});

export const submitOrderFailed = (error: number): ISubmitOrderFailed => ({
  type: SUBMIT_ORDER_FAILED,
  error,
});

export const dispatchOrder: AppThunk =
  (userOrder: string[]) => (dispatch: AppDispatch) => {
    dispatch(submitOrderRequest());
    submitOrder(userOrder)
      .then((res) => {
        dispatch(submitOrderSuccess(res));
      })
      .catch((err) => {
        dispatch(submitOrderFailed(err));
      });
  };