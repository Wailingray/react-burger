import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { Provider } from "react-redux";
import { TIngredientActions } from "./services/actions/ingredients";
import { TOrderActions } from "./services/actions/order";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TIngredientActions | TOrderActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="react-burger">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
