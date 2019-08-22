import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './styles/GoalSubmit.css';
import PropTypes from 'prop-types';
import {
  completeGoalType1Action,
  completeGoalType2Action
} from '../actions/goalActions';

const GoalSubmit = ({ goal, goalCompleted }) => {
  const dispatch = useDispatch();
  const [completedHours, setCompletedHours] = useState('');

  useEffect(() => {
    if (goal.target_type === 2 && goalCompleted) {
      console.log(goal);
    }
  }, [goal.target_type, goalCompleted]);

  if (goal.target_type === 1) {
    return (
      <Button
        variant='success'
        size='sm'
        className='goalSubmit-done-button'
        onClick={() => dispatch(completeGoalType1Action(goal))}
        disabled={goalCompleted}
      >
        &#10004;
      </Button>
    );
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(completeGoalType2Action(goal, completedHours));
    setCompletedHours('');
  };

  if (goalCompleted) {
    return (
      <Container className='goalSubmit-goal-completed-container'>
        &nbsp;Hours Completed:&nbsp;
        <Button
          variant='success'
          type='submit'
          size='sm'
          className='goalSubmit-done-button'
          disabled={goalCompleted}
        >
          &#10004;
        </Button>
      </Container>
    );
  }

  return (
    <Form inline='true' onSubmit={handleFormSubmit}>
      Hours Completed:&nbsp;&nbsp;
      <Form.Control
        required
        size='sm'
        className='goalSubmit-form-control'
        value={completedHours}
        onChange={e => setCompletedHours(e.target.value)}
      />
      &nbsp;
      <Button
        variant='success'
        type='submit'
        size='sm'
        className='goalSubmit-done-button'
        disabled={goalCompleted}
      >
        &#10004;
      </Button>
    </Form>
  );
};

export default GoalSubmit;

GoalSubmit.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    target_type: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    instances: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        goal_id: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  goalCompleted: PropTypes.bool.isRequired
};
