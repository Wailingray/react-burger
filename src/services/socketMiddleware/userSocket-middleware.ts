import {
  WS_PRIVATE_CONNECTION_START,
  WS_SEND_PRIVATE_MESSAGE,
  wsPrivateConnectionSuccess,
  wsPrivateConnectionError,
  wsGetPrivateMessage,
  wsPrivateConnectionClosed,
  wsPrivateConnectionStart,
} from "./../actions/wsUserActions";

import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../utils/utils";

export const userSocketMiddleware = (wsUrl: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let connected = false;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const token = getCookie("accessToken");
      if (type === WS_PRIVATE_CONNECTION_START.toString()) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        connected = true;
        socket.onopen = () => {
          dispatch(wsPrivateConnectionSuccess());
        };
        socket.onerror = () => {
          dispatch(wsPrivateConnectionError());
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetPrivateMessage(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsPrivateConnectionClosed());
          console.log("socket closed with code: ", event.code);
          if (!connected) {
            setTimeout(() => {
              dispatch(wsPrivateConnectionStart());
            }, 1000);
          }
        };

        if (type === WS_SEND_PRIVATE_MESSAGE.toString()) {
          const message = { ...payload, token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
