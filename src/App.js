import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchGoalsAction } from './actions/goalActions';
import Goals from './components/Goals';
import GoalForm from './components/GoalForm';
import GoalsHeader from './components/GoalsHeader';
import validationService from './components/services/validationService';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAction());
  }, [dispatch]);

  return (
    <Container>
      <GoalsHeader />
      <Goals />
      <GoalForm />
    </Container>
  );
}

export default App;
