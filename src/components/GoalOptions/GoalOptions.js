import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './GoalOptions.css';
import PropTypes from 'prop-types';
import { deleteGoalAction } from '../../actions/goalActions';
import {
  countGoalInstancesService,
  countGoalHoursService
} from '../../services/goalService';
import ChangeGoalForm from '../ChangeGoalForm/ChangeGoalForm';

const GoalOptions = ({ goal }) => {
  const dispatch = useDispatch();
  const [completedThisWeek, setCompletedThisWeek] = useState(0);

  useEffect(() => {
    switch (goal.target_type) {
      case 1:
        setCompletedThisWeek(
          goal.instances.filter(({ timestamp }) =>
            countGoalInstancesService(timestamp)
          ).length
        );
        break;
      case 2:
        setCompletedThisWeek(countGoalHoursService(goal.instances));
        break;
      default:
    }
  }, [goal.target_type, goal.instances]);

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [changeGoalButtonDisabled, setChangeGoalButtonDisabled] = useState(
    false
  );
  const [changeGoalFormDisplayed, setChangeGoalFormDisplayed] = useState(false);

  const handleChangeGoalButtonClick = () => {
    setDeleteButtonDisabled(true);
    setChangeGoalButtonDisabled(true);
    setChangeGoalFormDisplayed(true);
  };
  const hideChangeGoalForm = () => {
    setChangeGoalFormDisplayed(false);
    setChangeGoalButtonDisabled(false);
    setDeleteButtonDisabled(false);
  };

  return (
    <Card.Body>
      <Container className='GoalOptions-top-container'>
        <Row>
          Weekly Progress: {completedThisWeek}/{goal.target}
        </Row>
      </Container>
      {changeGoalFormDisplayed ? (
        <ChangeGoalForm goal={goal} hideChangeGoalForm={hideChangeGoalForm} />
      ) : (
        <Container className='GoalOptions-bottom-container'>
          <Row>
            <Button
              className='GoalOptions-change-goal-button'
              onClick={handleChangeGoalButtonClick}
              disabled={changeGoalButtonDisabled}
            >
              Change Goal
            </Button>
          </Row>
          <Row>
            <Button
              className='GoalOptions-delete-goal-button'
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
  }).isRequired
};
