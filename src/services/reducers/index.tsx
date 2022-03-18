import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsReducer } from "./wsVanillaReducer";
import { wsUserReducer } from "./wsUserReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: wsReducer,
  userFeed: wsUserReducer
});
