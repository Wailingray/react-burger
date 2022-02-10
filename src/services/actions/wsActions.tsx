import { wsServerRespond } from "../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_USER_NAME_UPDATE: "WS_USER_NAME_UPDATE" = "WS_USER_NAME_UPDATE";

export interface IwsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IwsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IwsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IwsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IwsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: wsServerRespond;
}

export interface IwsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export type TSocketActions =
  | IwsConnectionStart
  | IwsConnectionSuccess
  | IwsConnectionError
  | IwsConnectionClosed
  | IwsSendMessage
  | IwsGetMessage;

export const wsConnectionStart = (): IwsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = (): IwsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IwsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsConnectionClosed = (): IwsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message: any): IwsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: message,
});

export const wsSendMessage = (message: any): IwsSendMessage => ({
  type: WS_SEND_MESSAGE,
  payload: message,
});

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
