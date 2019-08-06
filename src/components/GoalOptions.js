import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Container, Card, Button } from 'react-bootstrap';

const GoalOptions = ({ name, target, onDeleteGoal }) => {
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);

  const handleDeleteGoal = () => {
    setDisableDeleteButton(true);
    fetch(`/goals/delete-goal/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        onDeleteGoal(name);
      }
    });
    setDisableDeleteButton(false);
  };

  return (
    <Card.Body>
      <Container className='goalOptions-container1'>
        Weekly target - {target}
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
  name: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  onDeleteGoal: PropTypes.func.isRequired
};
