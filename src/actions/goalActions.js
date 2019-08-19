import {
  FETCH_GOALS,
  NEW_GOAL,
  COMPLETE_GOAL,
  DELETE_GOAL,
  CHANGE_GOAL_TARGET
} from './types';

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

export const completeGoalAction = goalData => dispatch => {
  fetch('/goals/new-goal-instance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ goal_id: goalData.id })
  }).then(res =>
    res.json().then(goal =>
      dispatch({
        type: COMPLETE_GOAL,
        payload: { oldGoal: goalData, newGoal: goal }
      })
    )
  );
};

export const deleteGoalAction = goalData => dispatch => {
  fetch(`/goals/delete-goal/${goalData.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res =>
    res.json().then(goals =>
      dispatch({
        type: DELETE_GOAL,
        payload: goals
      })
    )
  );
};

export const changeGoalAction = (
  goalData,
  newGoalName,
  newGoalTarget
) => dispatch => {
  fetch(`/goals/change-goal/${goalData.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      goal_id: goalData.id,
      name: newGoalName,
      target: newGoalTarget
    })
  }).then(res =>
    res.json().then(goal =>
      dispatch({
        type: CHANGE_GOAL_TARGET,
        payload: { oldGoal: goalData, newGoal: goal }
      })
    )
  );
};
