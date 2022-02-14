import { userActionsBook } from "./actions/wsUserActions";
import { WS_URL, WS_URL_PRIVATE } from "./utils/utils";
import { socketMiddleware } from "./socketMiddleware/socket-middleware";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { vanillaActionsBook } from "./actions/wsActions";

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, vanillaActionsBook, "vanilla"),
    socketMiddleware(WS_URL_PRIVATE, userActionsBook, "private")
  )
);

export const store = createStore(rootReducer, enhancer);
