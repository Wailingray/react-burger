
import { TSocketPrivateActions, WS_GET_PRIVATE_MESSAGE, WS_PRIVATE_CONNECTION_CLOSED, WS_PRIVATE_CONNECTION_ERROR, WS_PRIVATE_CONNECTION_SUCCESS } from "../actions/wsUserActions";
import { TOrder, TServerOrder } from "../utils/types";

interface IZeroState {
  userOrders: TServerOrder[];
  total: number | null;
  totalToday: number | null;
  wsConnected: boolean;
  hasError: boolean;
}

export const initialState: IZeroState = {
  userOrders: [],
  total: null,
  totalToday: null,
  wsConnected: false,
  hasError: false,
};

export const wsUserReducer = (state = initialState, action: TSocketPrivateActions) => {
  switch (action.type) {
    case WS_PRIVATE_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        hasError: false,
      };

    case WS_PRIVATE_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        hasError: true,
      };

    case WS_PRIVATE_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_PRIVATE_MESSAGE:
      return {
        ...state,
        userOrders: action.payload.orders ,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
