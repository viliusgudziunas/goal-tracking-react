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

  // console.log(goals);
  const onNewGoal = goal => {
    setGoals(currentGoals => [...currentGoals, goal]);
  };

  return (
    <div>
      <GoalsHeader />
      <Goals goals={goals} />
      <GoalForm onNewGoal={onNewGoal} goals={goals} />
    </div>
  );
}

export default App;
