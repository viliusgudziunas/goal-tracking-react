import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalsAction } from './actions/goalActions';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';
import validationService from './components/services/validationService';

function App() {
  const [goals, setGoals] = useState([]);
  const temp = useSelector(state => state.goals.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAction());
  }, [dispatch]);

  const onCompleteGoal = updatedGoal => {
    goals.splice(goals.indexOf(updatedGoal), 1, updatedGoal);
    setGoals([...goals]);
  };

  const onChangeTarget = updatedGoal => {
    goals.splice(goals.indexOf(updatedGoal), 1, updatedGoal);
    setGoals([...goals]);
  };

  const validateNewGoalName = newGoalName => {
    return validationService.goalNameValidation(goals, newGoalName);
  };

  return (
    <div>
      <GoalsHeader />
      <Goals
        goals={temp}
        onDeleteGoal={updatedGoals => setGoals([...updatedGoals])}
        onCompleteGoal={onCompleteGoal}
        onChangeTarget={onChangeTarget}
      />
      <GoalForm
        onNewGoal={newGoal => setGoals([...goals, newGoal])}
        validateNewGoalName={validateNewGoalName}
      />
    </div>
  );
}

export default App;
