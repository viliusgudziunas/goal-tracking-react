import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './styles/GoalOptions.css';
import PropTypes from 'prop-types';
import { deleteGoalAction } from '../actions/goalActions';
import { countGoalInstancesService } from '../services/goalService';
import ChangeGoalForm from './ChangeGoalForm';

const GoalOptions = ({ goal }) => {
  const dispatch = useDispatch();
  const [completedGoalsThisWeek, setCompletedGoalsThisWeek] = useState(0);

  useEffect(() => {
    const goalInstancesThisWeek = goal.instances.filter(({ timestamp }) =>
      countGoalInstancesService(timestamp)
    ).length;
    setCompletedGoalsThisWeek(goalInstancesThisWeek);
  }, [goal]);

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [changeTargetButtonDisabled, setChangeTargetButtonDisabled] = useState(
    false
  );
  const [changeTargetFormDisplayed, setChangeTargetFormDisplayed] = useState(
    false
  );

  const handleChangeTargetButtonClick = () => {
    setDeleteButtonDisabled(true);
    setChangeTargetButtonDisabled(true);
    setChangeTargetFormDisplayed(true);
  };
  const hideChangeTargetForm = () => {
    setChangeTargetFormDisplayed(false);
    setChangeTargetButtonDisabled(false);
    setDeleteButtonDisabled(false);
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
      {changeTargetFormDisplayed && (
        <ChangeGoalForm
          goal={goal}
          hideChangeTargetForm={hideChangeTargetForm}
        />
      )}
      {!changeTargetFormDisplayed && (
        <Container className='goalOptions-container2'>
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
              onClick={() => dispatch(deleteGoalAction(goal))}
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
  }).isRequired
};
