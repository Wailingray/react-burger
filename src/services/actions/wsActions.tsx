import { wsServerRespond } from "../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

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

export const vanillaActionsBook = {
  startConnectionConst: WS_CONNECTION_START,
  sendMessageConst: WS_SEND_MESSAGE,
  wsStartConnection: wsConnectionStart,
  wsSendMessage: wsSendMessage,
  wsOnOpen: wsConnectionSuccess,
  wsOnClose: wsConnectionClosed,
  wsOnError: wsConnectionError,
  wsGetMessage: wsGetMessage
};
