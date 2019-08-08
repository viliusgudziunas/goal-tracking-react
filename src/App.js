import React, { useState, useEffect } from 'react';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';
import validationService from './components/services/validationService';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('/users/1').then(res =>
      res.json().then(data => {
        setGoals(data);
      })
    );
  }, []);

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
        goals={goals}
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
