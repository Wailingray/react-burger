import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  cart: constructorReducer
});
