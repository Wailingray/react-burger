import {
  TSocketActions,
  WS_CONNECTION_START,
  wsConnectionSuccess,
  wsConnectionError,
  wsGetMessage,
  wsConnectionClosed,
  wsConnectionStart,
  WS_SEND_MESSAGE,
} from "../actions/wsActions";
import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../utils/utils";

export const socketMiddleware = (wsUrl: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let connected = false;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START.toString()) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        connected = true;
        socket.onopen = () => {
          dispatch(wsConnectionSuccess());
        };
        socket.onerror = () => {
          dispatch(wsConnectionError());
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetMessage(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed());
          console.log("socket closed with code: ", event.code);
          if (!connected) {
            setTimeout(() => {
              dispatch(wsConnectionStart());
            }, 1000);
          }
        };

        if (type === WS_SEND_MESSAGE.toString()) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
