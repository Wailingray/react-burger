import { submitOrder } from "../../components/api/api";

export const SUBMIT_ORDER_REQUEST = 'SUBMIT_ORDER_REQUEST';
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILED = 'SUBMIT_ORDER_FAILED';


export function dispatchOrder() {
  return function(dispatch) {
    dispatch({
      type: SUBMIT_ORDER_REQUEST
    });
    submitOrder().then(res => {
      if (res && res.success) {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          order: res
        });
      } else {
        dispatch({
          type: SUBMIT_ORDER_FAILED
        });
      }
    });
  };
}
