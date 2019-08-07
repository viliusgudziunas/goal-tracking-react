import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalOptions.css';
import { Container, Card, Button, Row, Form, Col } from 'react-bootstrap';

const GoalOptions = ({ goal, onDeleteGoal, onChangeTarget }) => {
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const [disableChangeTargetButton, setDisableChangeTargetButton] = useState(
    false
  );
  const [completedGoalsThisWeek, setCompletedGoalsThisWeek] = useState(0);
  const [displayChangeTargetForm, setDisplayChangeTargetForm] = useState(false);
  const [newGoalTarget, setNewGoalTarget] = useState('');

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

  const handleDeleteGoal = async () => {
    setDisableDeleteButton(true);
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
    setDisableDeleteButton(false);
  };

  const handleChangeTargetButtonClick = () => {
    setDisableChangeTargetButton(true);
    setDisplayChangeTargetForm(true);
    // const newTarget = { goal_id: goal.id, target: 15 };
    // fetch(`/goals/change-goal-target/${goal.id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newTarget)
    // }).then(res => {
    //   res.json().then(response => {
    //     onChangeTarget(response);
    //   });
    // });
    // setDisableChangeTargetButton(false);
  };

  const handleGoalTargetChange = e => {
    if (e.target.value === '') {
      setNewGoalTarget(e.target.value);
      console.log('Goal target empty');
    } else {
      if (isNaN(e.target.value)) {
        console.log('Not a number');
      } else if (!Number.isInteger(Number(e.target.value))) {
        console.log('Not an integer');
      } else if (e.target.value < 1) {
        console.log('Smaller than 1');
      } else if (Number(e.target.value) === goal.target) {
        console.log('Same value as current target');
      } else {
        console.log('Goal target valid');
      }
      setNewGoalTarget(e.target.value);
    }
  };

  const handleChangeTargetFormSubmit = () => {};

  return (
    <Card.Body>
      <Container className='goalOptions-container1'>
        <Row>
          Weekly Progress: {completedGoalsThisWeek}/{goal.target}
        </Row>
      </Container>
      {displayChangeTargetForm && (
        <Container className='goalOptions-container2'>
          <Form onSubmit={handleChangeTargetFormSubmit}>
            <Form.Row>
              <Col md='auto'>
                <Form.Control
                  required
                  type='goalTarget'
                  value={newGoalTarget}
                  onChange={handleGoalTargetChange}
                  placeholder='Enter New Goal Target'
                />
              </Col>
              <Col md='auto'>
                <Button type='submit'>Change Target</Button>
              </Col>
              <Col md='auto'>
                <Button variant='secondary'>Back</Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      )}
      {!displayChangeTargetForm && (
        <Container className='goalOptions-container3'>
          <Row>
            <Button
              className='goalOptions-change-target-button'
              onClick={handleChangeTargetButtonClick}
              disabled={disableChangeTargetButton}
            >
              Change Target
            </Button>
          </Row>
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
