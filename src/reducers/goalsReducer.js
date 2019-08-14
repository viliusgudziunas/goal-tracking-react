import { FETCH_GOALS, NEW_GOAL } from '../actions/types';

const initialState = {
  items: []
};

const goalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GOALS:
      return {
        ...state,
        items: payload
      };
    case NEW_GOAL:
      return {
        ...state,
        items: [...state.items, payload]
      };
    default:
      return state;
  }
};

export default goalsReducer;
