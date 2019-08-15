import {
  FETCH_GOALS,
  NEW_GOAL,
  COMPLETE_GOAL,
  DELETE_GOAL
} from '../actions/types';

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
      state.items.splice(
        state.items.indexOf(payload.oldGoal),
        1,
        payload.newGoal
      );
      return {
        ...state,
        items: [...state.items]
      };
    case DELETE_GOAL:
      return {
        ...state,
        items: [...payload]
      };
    default:
      return state;
  }
};

export default goalsReducer;
