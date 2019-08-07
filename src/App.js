import React, { useState, useEffect } from 'react';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';

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

  const validateGoalName = currentName => {
    return (
      goals.filter(
        ({ name }) => name.toLowerCase() === currentName.toLowerCase().trim()
      ).length === 0
    );
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
        validateGoalName={validateGoalName}
      />
    </div>
  );
}

export default App;
