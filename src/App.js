import React, { useState, useEffect } from 'react';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('/users/1').then(res =>
      res.json().then(data => {
        setGoals(data.goals);
      })
    );
  }, []);

  const onNewGoal = goal => {
    setGoals(currentGoals => [...currentGoals, goal]);
  };

  const onDeleteGoal = goal => {
    const goalToDelete = goals.filter(({ name }) => name === goal)[0];
    goals.splice(goals.indexOf(goalToDelete), 1);
    setGoals([...goals]);
  };

  return (
    <div>
      <GoalsHeader />
      <Goals goals={goals} onDeleteGoal={onDeleteGoal} />
      <GoalForm onNewGoal={onNewGoal} goals={goals} />
    </div>
  );
}

export default App;
