import {
  TSocketActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsActions";
import { TOrder, TServerOrder } from "../utils/types";

interface IZeroState {
  orders: TServerOrder[];
  total: number | null;
  totalToday: number | null;
  wsConnected: boolean;
  hasError: boolean;
}

export const initialState: IZeroState = {
  orders: [],
  total: null,
  totalToday: null,
  wsConnected: false,
  hasError: false,
};

export const wsReducer = (state = initialState, action: TSocketActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        hasError: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        hasError: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders ,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
