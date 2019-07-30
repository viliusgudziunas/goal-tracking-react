import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Container, Card, Button } from 'react-bootstrap';

const GoalOptions = ({ name, target, onDeleteGoal }) => {
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
      <Container className='goalOptions-container1'>
        Montly target - {target}
      </Container>
      <Container className='goalOptions-container2'>
        <Button
          className='goalOptions-delete-button'
          onClick={handleDeleteGoal}
          disabled={disableDeleteButton}
        >
          Delete Goal
        </Button>
      </Container>
    </Card.Body>
  );
};

export default GoalOptions;

GoalOptions.propTypes = {
  name: PropTypes.string,
  target: PropTypes.number,
  onDeleteGoal: PropTypes.func
};
