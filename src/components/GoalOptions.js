import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import './styles/GoalOptions.css';
import PropTypes from 'prop-types';
import goalService from './services/goalService';
import ChangeTargetForm from './ChangeTargetForm';

const GoalOptions = ({ goal, onDeleteGoal, onChangeTarget }) => {
  const [completedGoalsThisWeek, setCompletedGoalsThisWeek] = useState(0);

  useEffect(() => {
    const goalInstancesThisWeek = goal.instances.filter(({ timestamp }) =>
      goalService.countGoalInstancesThisWeek(timestamp)
    ).length;
    setCompletedGoalsThisWeek(goalInstancesThisWeek);
  }, [goal]);

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const handleDeleteGoal = async () => {
    setDeleteButtonDisabled(true);
    await fetch(`/goals/delete-goal/${goal.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      res.json().then(response => {
        onDeleteGoal(response);
      });
    });
    setDeleteButtonDisabled(false);
  };

  const [changeTargetButtonDisabled, setChangeTargetButtonDisabled] = useState(
    false
  );
  const [changeTargetFormDisplayed, setChangeTargetFormDisplayed] = useState(
    false
  );

  const handleChangeTargetButtonClick = () => {
    setChangeTargetButtonDisabled(true);
    setChangeTargetFormDisplayed(true);
  };
  const hideChangeTargetForm = () => {
    setChangeTargetFormDisplayed(false);
    setChangeTargetButtonDisabled(false);
  };

  return (
    <Card.Body>
      <Container className='goalOptions-container1'>
        <Row>
          Weekly Progress: {completedGoalsThisWeek}/{goal.target}
        </Row>
      </Container>
      {changeTargetFormDisplayed && (
        <ChangeTargetForm
          goal={goal}
          onChangeTarget={onChangeTarget}
          hideChangeTargetForm={hideChangeTargetForm}
        />
      )}
      {!changeTargetFormDisplayed && (
        <Container className='goalOptions-container3'>
          <Row>
            <Button
              className='goalOptions-change-target-button'
              onClick={handleChangeTargetButtonClick}
              disabled={changeTargetButtonDisabled}
            >
              Change Target
            </Button>
          </Row>
          <Row>
            <Button
              className='goalOptions-delete-button'
              onClick={handleDeleteGoal}
              disabled={deleteButtonDisabled}
            >
              Delete Goal
            </Button>
          </Row>
        </Container>
      )}
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
  onDeleteGoal: PropTypes.func.isRequired,
  onChangeTarget: PropTypes.func.isRequired
};
