import { AppDispatch, AppThunk } from "../..";
import { getIngredients } from "../../components/api/api";
import { TIngredient } from "../../utils/types";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";
export const ADD_TO_CONSTRUCTOR: "ADD_TO_CONSTRUCTOR" = "ADD_TO_CONSTRUCTOR";
export const REMOVE_FROM_CONSTRUCTOR: "REMOVE_FROM_CONSTRUCTOR" =
  "REMOVE_FROM_CONSTRUCTOR";
export const REPLACE_BUN: "REPLACE_BUN" = "REPLACE_BUN";
export const MOVE_ITEM: "MOVE_ITEM" = "MOVE_ITEM";
export const RECALCULATE_PRICE: "RECALCULATE_PRICE" = "RECALCULATE_PRICE";
export const SEND_TO_MODAL: "SEND_TO_MODAL" = "SEND_TO_MODAL";
export const RESET_CURRENT_INGREDIENT: "RESET_CURRENT_INGREDIENT" =
  "RESET_CURRENT_INGREDIENT";

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TIngredient[];
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly error: number;
}

export interface IAddToConstructor {
  readonly type: typeof ADD_TO_CONSTRUCTOR;
  readonly id: string;
}

export interface IRemoveFromConstructor {
  readonly type: typeof REMOVE_FROM_CONSTRUCTOR;
  readonly index: number;
}

export interface IReplaceBun {
  readonly type: typeof REPLACE_BUN;
  readonly id: string;
}

export interface IMoveItem {
  readonly type: typeof MOVE_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IRecalculatePrice {
  readonly type: typeof RECALCULATE_PRICE;
}

export interface ISendToModal {
  readonly type: typeof SEND_TO_MODAL;
  readonly id: string;
}

export interface IResetCurrentIngredient {
  readonly type: typeof RESET_CURRENT_INGREDIENT;
}

export type TIngredientActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | IAddToConstructor
  | IRemoveFromConstructor
  | IReplaceBun
  | IMoveItem
  | IRecalculatePrice
  | ISendToModal
  | IResetCurrentIngredient;

export const getItemsRequest = (): IGetItemsRequest => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsSuccess = (items: TIngredient[]): IGetItemsSuccess => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

export const getItemsFailed = (error: number): IGetItemsFailed => ({
  type: GET_ITEMS_FAILED,
  error,
});

/* export const AddToConstructor = (): IAddToConstructor => ({
  type: GET_ITEMS_REQUEST
}) */

export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getItemsRequest());
  getIngredients()
    .then((res) => {
      dispatch(getItemsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getItemsFailed(err));
    });
};
