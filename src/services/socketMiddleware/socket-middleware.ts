import { TActionsBook } from "./../utils/types";
import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../utils/utils";

export const socketMiddleware = (
  wsUrl: string,
  actionBook: TActionsBook,
  connectionType: "private" | "vanilla"
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let connected = false;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const token = connectionType === "private" ? getCookie("accessToken") : null;

      if (type === actionBook.startConnectionConst) {
        if (connectionType === "vanilla") socket = new WebSocket(`${wsUrl}`);
        else if(connectionType === "private") socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        connected = true;

        socket.onopen = () => {
          dispatch(actionBook.wsOnOpen());

        };
        socket.onerror = () => {
          dispatch(actionBook.wsOnError());
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(actionBook.wsGetMessage(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch(actionBook.wsOnClose());
          console.log("socket closed with code: ", event.code);
          if (!connected) {
            setTimeout(() => {
              dispatch(actionBook.wsStartConnection());
            }, 1000);
          }
        };

        if (type === actionBook.sendMessageConst) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
