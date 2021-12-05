import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients";

const initialState = {
  IngredientsItems: [],
  IngredientsItemsRequest: false,
  IngredientsItemsFailed: false,

  constructorItems: [],

  currentTab: 'items'
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, IngredientsItemsRequest: true };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, IngredientsItemsFailed: false, IngredientsItems: action.items, IngredientsItemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, IngredientsItemsFailed: true, IngredientsItemsRequest: false };
    }
  }
}
