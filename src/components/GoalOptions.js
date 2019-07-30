import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Card, Button } from 'react-bootstrap';

const GoalOptions = ({ name, onDeleteGoal }) => {
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);

  const handleDeleteGoal = async () => {
    setDisableDeleteButton(true);
    const response = await fetch(`/goals/delete-goal/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      onDeleteGoal(name);
    }
    setDisableDeleteButton(false);
  };

  return (
    <Card.Body>
      <Button
        className='goalOptions-delete-button'
        onClick={handleDeleteGoal}
        disabled={disableDeleteButton}
      >
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
