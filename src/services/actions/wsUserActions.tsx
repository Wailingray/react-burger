import { wsServerRespond } from "../utils/types";

export const WS_PRIVATE_CONNECTION_START: "WS_PRIVATE_CONNECTION_START" =
  "WS_PRIVATE_CONNECTION_START";
export const WS_PRIVATE_CONNECTION_SUCCESS: "WS_PRIVATE_CONNECTION_SUCCESS" =
  "WS_PRIVATE_CONNECTION_SUCCESS";
export const WS_PRIVATE_CONNECTION_ERROR: "WS_PRIVATE_CONNECTION_ERROR" =
  "WS_PRIVATE_CONNECTION_ERROR";
export const WS_PRIVATE_CONNECTION_CLOSED: "WS_PRIVATE_CONNECTION_CLOSED" =
  "WS_PRIVATE_CONNECTION_CLOSED";
export const WS_GET_PRIVATE_MESSAGE: "WS_GET_PRIVATE_MESSAGE" =
  "WS_GET_PRIVATE_MESSAGE";
export const WS_SEND_PRIVATE_MESSAGE: "WS_SEND_PRIVATE_MESSAGE" =
  "WS_SEND_PRIVATE_MESSAGE";

 export interface IwsPrivateConnectionStart {
  readonly type: typeof WS_PRIVATE_CONNECTION_START;
}

export interface IwsPrivateConnectionSuccess {
  readonly type: typeof WS_PRIVATE_CONNECTION_SUCCESS;
}

export interface IwsPrivateConnectionError {
  readonly type: typeof WS_PRIVATE_CONNECTION_ERROR;
}

export interface IwsPrivateConnectionClosed {
  readonly type: typeof WS_PRIVATE_CONNECTION_CLOSED;
}

export interface IwsGetPrivateMessage {
  readonly type: typeof WS_GET_PRIVATE_MESSAGE;
  readonly payload: wsServerRespond;
}

export interface IwsSendPrivateMessage {
  readonly type: typeof WS_SEND_PRIVATE_MESSAGE;
  readonly payload: any;
}

export type TSocketPrivateActions =
  | IwsPrivateConnectionStart
  | IwsPrivateConnectionSuccess
  | IwsPrivateConnectionError
  | IwsPrivateConnectionClosed
  | IwsSendPrivateMessage
  | IwsGetPrivateMessage;

export const wsPrivateConnectionStart = (): IwsPrivateConnectionStart => ({
  type: WS_PRIVATE_CONNECTION_START,
});

export const wsPrivateConnectionSuccess = (): IwsPrivateConnectionSuccess => ({
  type: WS_PRIVATE_CONNECTION_SUCCESS,
});

export const wsPrivateConnectionError = (): IwsPrivateConnectionError => ({
  type: WS_PRIVATE_CONNECTION_ERROR,
});

export const wsPrivateConnectionClosed = (): IwsPrivateConnectionClosed => ({
  type: WS_PRIVATE_CONNECTION_CLOSED,
});

export const wsGetPrivateMessage = (message: any): IwsGetPrivateMessage => ({
  type: WS_GET_PRIVATE_MESSAGE,
  payload: message,
});

export const wsSendMessage = (message: any): IwsSendPrivateMessage => ({
  type: WS_SEND_PRIVATE_MESSAGE,
  payload: message,
});

