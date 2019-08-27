import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchGoalsAction } from './actions/goalActions';
import GoalsList from './components/GoalsList/GoalsList';
import NewGoalForm from './components/NewGoalForm/NewGoalForm';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAction());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <GoalsList />
      <NewGoalForm />
    </Container>
  );
}

export default App;
