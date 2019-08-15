import { FETCH_GOALS, NEW_GOAL, COMPLETE_GOAL } from '../actions/types';

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
    case COMPLETE_GOAL:
      return {
        ...state,
        items: state.items.splice(state.items.indexOf(payload), 1, payload.id)
      };
    default:
      return state;
  }
};

export default goalsReducer;
