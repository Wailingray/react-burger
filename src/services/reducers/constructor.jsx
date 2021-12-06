import { hardCode } from "../../utils/utils";

import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
} from "../actions/constructor";

const initialState = {
  constructorItems: hardCode,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR: {
      return {
        constructorItems: [...state.constructorItems, action.item],
      };
    }
    case REMOVE_FROM_CONSTRUCTOR: {
      return {
        constructorItems: [...state.constructorItems].filter(
          (item) => item._id !== action.id
        ),
      };
    }
    default: {
      return state;
    }
  }
};
