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
    const currentMaxID = Math.max(
      ...goals.map(o => {
        return o.id;
      })
    );
    let maxID = 1;
    if (currentMaxID > 0) {
      maxID = currentMaxID + 1;
    }
    const newGoal = goal;
    newGoal.id = maxID;
    newGoal.timestamp = `${new Date()}`;
    newGoal.instances = [];
    setGoals(currentGoals => [...currentGoals, newGoal]);
  };

  const validateGoalName = currentName => {
    return (
      goals.filter(
        ({ name }) => name.toLowerCase() === currentName.toLowerCase().trim()
      ).length === 0
    );
  };

  const onDeleteGoal = goal => {
    const goalToDelete = goals.filter(({ name }) => name === goal)[0];
    goals.splice(goals.indexOf(goalToDelete), 1);
    setGoals([...goals]);
  };

  const onCompleteGoal = goal => {
    const currentMaxID = Math.max(
      ...goal.instances.map(o => {
        return o.id;
      })
    );
    let maxID = 1;
    if (currentMaxID > 0) {
      maxID = currentMaxID + 1;
    }
    const newInstance = {
      goal_id: goal.id,
      id: maxID,
      timestamp: String(new Date())
    };
    const updatedGoal = {
      id: goal.id,
      name: goal.name,
      target: goal.target,
      timestamp: goal.timestamp,
      instances: [...goal.instances, newInstance]
    };
    const goalToDelete = goals.filter(({ id }) => id === goal.id)[0];
    goals.splice(goals.indexOf(goalToDelete), 1, updatedGoal);
    setGoals([...goals]);
  };

  return (
    <div>
      <GoalsHeader />
      <Goals
        goals={goals}
        onDeleteGoal={onDeleteGoal}
        onCompleteGoal={onCompleteGoal}
      />
      <GoalForm onNewGoal={onNewGoal} validateGoalName={validateGoalName} />
    </div>
  );
}

export default App;
