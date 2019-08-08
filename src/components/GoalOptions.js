import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Form, Col } from 'react-bootstrap';
import './styles/GoalOptions.css';
import PropTypes from 'prop-types';
import goalService from './services/goalService';

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

  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalTargetInvalid, setNewGoalTargetInvalid] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      newGoalTarget === '' ||
      (Number.isInteger(Number(newGoalTarget)) &&
        newGoalTarget > 0 &&
        Number(newGoalTarget) !== goal.target)
    ) {
      setNewGoalTargetInvalid(false);
      setSubmitButtonDisabled(false);
    } else {
      setNewGoalTargetInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [newGoalTarget, goal.target]);

  const handleFormSubmit = async e => {
    e.preventDefault();
    await fetch(`/goals/change-goal-target/${goal.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal_id: goal.id, target: newGoalTarget })
    }).then(res => {
      res.json().then(response => {
        onChangeTarget(response);
        setNewGoalTarget('');
      });
    });
    setChangeTargetFormDisplayed(false);
    setChangeTargetButtonDisabled(false);
  };

  const handleGoalTargetChangeBack = () => {
    setNewGoalTarget('');
    setNewGoalTargetInvalid(false);
    setSubmitButtonDisabled(false);
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
        <Container className='goalOptions-container2'>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col>
                <Form.Control
                  required
                  type='goalTarget'
                  value={newGoalTarget}
                  onChange={e => setNewGoalTarget(e.target.value)}
                  placeholder='Enter New Goal Target'
                />
                {newGoalTargetInvalid && (
                  <Form.Row className='goaloptions-change-goal-target-error'>
                    * Goal target must be a full number greater than 0
                  </Form.Row>
                )}
              </Col>
              <Col sm='true'>
                <Button type='submit' disabled={submitButtonDisabled}>
                  Change Target
                </Button>
              </Col>
              <Col sm='true'>
                <Button
                  variant='secondary'
                  onClick={handleGoalTargetChangeBack}
                >
                  Back
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
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
