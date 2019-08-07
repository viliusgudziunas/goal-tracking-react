import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalForm.css';
import { Container, Form, Col, Button } from 'react-bootstrap';

const GoalForm = ({ onNewGoal, validateGoalName }) => {
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [goalNameInvalid, setGoalNameInvalid] = useState(false);
  const [goalTargetInvalid, setGoalTargetInvalid] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisableSubmitButton(true);
    const goal = { name: goalName.trim(), target: Number(goalTarget) };
    await fetch('/goals/new-goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    }).then(res => {
      res.json().then(response => {
        onNewGoal(response);
        setGoalName('');
        setGoalTarget('');
      });
    });
    setDisableSubmitButton(false);
  };

  const handleGoalNameChange = e => {
    if (e.target.value === '') {
      setGoalName(e.target.value);
      setGoalNameInvalid(false);
      if (!goalTargetInvalid) {
        setDisableSubmitButton(false);
      }
    } else {
      if (!validateGoalName(e.target.value)) {
        setDisableSubmitButton(true);
        setGoalNameInvalid(true);
      } else if (Number.isInteger(Number(e.target.value))) {
        setDisableSubmitButton(true);
        setGoalNameInvalid(true);
      } else {
        if (!goalTargetInvalid) {
          setDisableSubmitButton(false);
        }
        setGoalNameInvalid(false);
      }
      setGoalName(e.target.value);
    }
  };

  const handleGoalTargetChange = e => {
    if (e.target.value === '') {
      setGoalTarget(e.target.value);
      setGoalTargetInvalid(false);
      if (!goalNameInvalid) {
        setDisableSubmitButton(false);
      }
    } else {
      if (isNaN(e.target.value)) {
        setDisableSubmitButton(true);
        setGoalTargetInvalid(true);
      } else if (!Number.isInteger(Number(e.target.value))) {
        setDisableSubmitButton(true);
        setGoalTargetInvalid(true);
      } else if (e.target.value < 1) {
        setDisableSubmitButton(true);
        setGoalTargetInvalid(true);
      } else {
        if (!goalNameInvalid) {
          setDisableSubmitButton(false);
        }
        setGoalTargetInvalid(false);
      }
      setGoalTarget(e.target.value);
    }
  };

  return (
    <Container className='goalform-container'>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              required
              type='goalName'
              value={goalName}
              onChange={handleGoalNameChange}
              placeholder='Enter Goal Name'
            />
            {goalNameInvalid && (
              <Container>
                <Form.Row className='goalform-goal-name-error'>
                  * Goal names must be unique
                </Form.Row>
                <Form.Row className='goalform-goal-name-error'>
                  * Goal names must be words
                </Form.Row>
              </Container>
            )}
          </Col>
          <Col>
            <Form.Control
              required
              type='goalTarget'
              value={goalTarget}
              onChange={handleGoalTargetChange}
              placeholder='Enter Weekly Target'
            />
            {goalTargetInvalid && (
              <Container>
                <Form.Row className='goalform-goal-target-error'>
                  * Goal target must be a full number greater than 0
                </Form.Row>
              </Container>
            )}
          </Col>
        </Form.Row>
        <Button type='submit' disabled={disableSubmitButton}>
          Add New Goal
        </Button>
      </Form>
    </Container>
  );
};

export default GoalForm;

GoalForm.propTypes = {
  onNewGoal: PropTypes.func.isRequired,
  validateGoalName: PropTypes.func.isRequired
};
