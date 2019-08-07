import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Container, Card, Button, Row } from 'react-bootstrap';

const GoalOptions = ({ goal, onDeleteGoal }) => {
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const [completedGoalsThisWeek, setCompletedGoalsThisWeek] = useState(0);

  const handleDeleteGoal = () => {
    setDisableDeleteButton(true);
    fetch(`/goals/delete-goal/${goal.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        onDeleteGoal(goal.name);
      }
    });
    setDisableDeleteButton(false);
  };

  const countInstancesThisWeek = timestamp => {
    const lastMonday = new Date();
    lastMonday.setHours(0, 0, 0, 0);
    while (lastMonday.getDay() !== 1) {
      lastMonday.setDate(lastMonday.getDate() - 1);
    }
    return lastMonday < new Date(timestamp);
  };

  useEffect(() => {
    const goalInstancesThisWeek = goal.instances.filter(({ timestamp }) =>
      countInstancesThisWeek(timestamp)
    ).length;
    setCompletedGoalsThisWeek(goalInstancesThisWeek);
  }, [goal]);

  return (
    <Card.Body>
      <Container className='goalOptions-container1'>
        <Row>
          Weekly Progress: {completedGoalsThisWeek}/{goal.target}
        </Row>
      </Container>
      <Container className='goalOptions-container2'>
        <Row>
          <Button
            className='goalOptions-delete-button'
            onClick={handleDeleteGoal}
            disabled={disableDeleteButton}
          >
            Delete Goal
          </Button>
        </Row>
      </Container>
    </Card.Body>
  );
};

export default GoalOptions;

GoalOptions.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
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
  onDeleteGoal: PropTypes.func.isRequired
};
