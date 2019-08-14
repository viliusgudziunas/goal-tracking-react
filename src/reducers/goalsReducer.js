import { FETCH_GOALS, NEW_GOAL } from '../actions/types';

const initialState = {
  items: []
};

const goalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GOALS:
    case NEW_GOAL:
      return {
        ...state,
        items: payload
      };
    default:
      return state;
  }
};

export default goalsReducer;
