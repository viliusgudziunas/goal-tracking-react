import React from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Card, Button } from 'react-bootstrap';

const GoalOptions = ({ name, onDeleteGoal }) => {
  const handleDeleteGoal = async () => {
    const response = await fetch(`/goals/delete-goal/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    onDeleteGoal(name);
  };

  return (
    <Card.Body>
      <Button className='goalOptions-delete-button' onClick={handleDeleteGoal}>
        Delete Goal
      </Button>
    </Card.Body>
  );
};

export default GoalOptions;

GoalOptions.propTypes = {
  name: PropTypes.string,
  onDeleteGoal: PropTypes.func
};
