import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients";

const initialState = {
  ingredientItems: [],
  ingredientItemsRequest: false,
  ingredientItemsFailed: false,

  constructorItems: [],

  currentTab: 'items'
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, ingredientItemsRequest: true };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, ingredientItemsFailed: false, ingredientItems: action.items, ingredientItemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, ingredientItemsFailed: true, ingredientItemsRequest: false };
    }
    default: {
      return state;
    }
  }
}
