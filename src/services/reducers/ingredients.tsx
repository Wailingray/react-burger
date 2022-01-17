import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SEND_TO_MODAL,
  RESET_CURRENT_INGREDIENT,
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  REPLACE_BUN,
  MOVE_ITEM,
  RECALCULATE_PRICE,
  TIngredientActions,
} from "../actions/ingredients";

import { burgerExample } from "../../utils/utils";
import { TIngredient } from "../../utils/types";

type TIngredientsState = {
  ingredientItems: readonly TIngredient[];
  ingredientItemsRequest: boolean;
  ingredientItemsFailed: boolean;
  ingredientItemsError: number | null;

  constructorItems: readonly TIngredient[];

  totalPrice: number;

  currentIngredient: TIngredient | null;

  currentTab: "one" | "two" | "three";
};

const initialState: TIngredientsState = {
  ingredientItems: [],
  ingredientItemsRequest: false,
  ingredientItemsFailed: false,
  ingredientItemsError: null,

  constructorItems: [...burgerExample],

  totalPrice: 0,

  currentIngredient: null,

  currentTab: "one",
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientActions
): TIngredientsState => {
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
        ...initialState,
        ingredientItemsFailed: true,
        ingredientItemsError: action.error,
      };
    }
    case SEND_TO_MODAL: {
      return {
        ...state,
        currentIngredient: JSON.parse(
          JSON.stringify(state.ingredientItems)
        ).find((item: TIngredient) => item._id === action.id),
      };
    }
    case RESET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    case ADD_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems,
          [...state.ingredientItems].find((item) => item._id === action.id)!,
        ],
      };
    }
    case RECALCULATE_PRICE: {
      return {
        ...state,
        totalPrice: state.constructorItems.reduce(
          (sum, el) => sum + el.price,
          0
        ),
      };
    }
    case REPLACE_BUN: {
      return {
        ...state,
        constructorItems:
          state.constructorItems.length &&
          state.constructorItems[0].type === "bun"
            ? [
                state.ingredientItems.find((item) => item._id === action.id)!,
              ].concat(state.constructorItems.slice(1))
            : [
                state.ingredientItems.find((item) => item._id === action.id)!,
              ].concat(state.constructorItems),
      };
    }
    case MOVE_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems].map((item, idx) => {
          if (idx === action.dragIndex) {
            return [...state.constructorItems].find(
              (item, idx) => idx === action.hoverIndex
            )!;
          } else if (idx === action.hoverIndex) {
            return [...state.constructorItems].find(
              (item, idx) => idx === action.dragIndex
            )!;
          } else return item;
        }),
      };
    }
    case REMOVE_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [...state.constructorItems].filter(
          (item, index) => index !== action.index
        ),
      };
    }
    default: {
      return state;
    }
  }
};
