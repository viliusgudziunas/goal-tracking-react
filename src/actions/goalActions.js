import { FETCH_GOALS, NEW_GOAL } from './types';

export const fetchGoalsAction = () => dispatch => {
  fetch('/users/1').then(res =>
    res.json().then(goals =>
      dispatch({
        type: FETCH_GOALS,
        payload: goals
      })
    )
  );
};

export const addNewGoalAction = goalData => dispatch => {
  fetch('/goals/new-goal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goalData)
  }).then(res =>
    res.json().then(goal =>
      dispatch({
        type: NEW_GOAL,
        payload: goal
      })
    )
  );
};
