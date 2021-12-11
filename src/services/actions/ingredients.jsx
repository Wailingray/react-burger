import { getData } from "../../components/api/api";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
export const REMOVE_FROM_CONSTRUCTOR = 'REMOVE_FROM_CONSTRUCTOR';
export const REPLACE_BUN = 'REPLACE_BUN'
export const MOVE_ITEM = 'MOVE_ITEM'

export const SEND_TO_MODAL = 'SEND_TO_MODAL';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT'

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getData().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    });
  };
}
