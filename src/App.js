import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalsAction } from './actions/goalActions';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';

function App() {
  const [goals, setGoals] = useState([]);
  const tempGoals = useSelector(state => state.goals.items);
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

  return (
    <div>
      <GoalsHeader />
      <Goals
        goals={tempGoals}
        onDeleteGoal={updatedGoals => setGoals([...updatedGoals])}
        onCompleteGoal={onCompleteGoal}
        onChangeTarget={onChangeTarget}
      />
      <GoalForm />
    </div>
  );
}

export default App;
