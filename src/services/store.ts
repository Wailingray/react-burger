import { WS_URL } from "./utils/utils";
import { socketMiddleware } from "./socketMiddleware/socket-middleware";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const wsSocket = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL, false)));

export const store = createStore(rootReducer, wsSocket);
