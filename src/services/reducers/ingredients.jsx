import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SEND_TO_MODAL,
  RESET_CURRENT_INGREDIENT,
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR
} from "../actions/ingredients";

import { hardCode } from "../../utils/utils";

const initialState = {
  ingredientItems: [],
  ingredientItemsRequest: false,
  ingredientItemsFailed: false,

  constructorItems: hardCode,

  currentIngredient: {},

  currentTab: "items",
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, ingredientItemsRequest: true };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        ingredientItemsFailed: false,
        ingredientItems: action.items,
        ingredientItemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        ingredientItemsFailed: true,
        ingredientItemsRequest: false,
      };
    }
    case SEND_TO_MODAL: {
      return {
        ...state,
        currentIngredient: [...state.ingredientItems].find(
          (item) => item._id === action.id
        ),
      };
    }
    case RESET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    case ADD_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, [...state.ingredientItems].find(
          (item) => item._id === action.id
        )],
        ingredientItems: [...state.ingredientItems].map(item =>
          item._id === action.id ? { ...item, __v: ++item.__v } : item
        )
      };
    }
    case REMOVE_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [...state.constructorItems].filter(
          (item) => item._id !== action.id
        ),
        ingredientItems: [...state.ingredientItems].map(item =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        )
      };
    }
    default: {
      return state;
    }

  }
};
