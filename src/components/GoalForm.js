import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import './styles/GoalForm.css';
import PropTypes from 'prop-types';
import validationService from './services/validationService';

const GoalForm = ({ onNewGoal, validateNewGoalName }) => {
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    await fetch('/goals/new-goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: goalName.trim(),
        target: Number(goalTarget)
      })
    }).then(res => {
      res.json().then(response => {
        onNewGoal(response);
        setGoalName('');
        setGoalTarget('');
      });
    });
    setSubmitButtonDisabled(false);
  };

  const [goalNameInvalid, setGoalNameInvalid] = useState(false);
  const [goalTargetInvalid, setGoalTargetInvalid] = useState(false);

  useEffect(() => {
    if (
      goalName === '' ||
      (validateNewGoalName(goalName) &&
        !validationService.checkForNumbers(goalName))
    ) {
      setGoalNameInvalid(false);
      if (!goalTargetInvalid) setSubmitButtonDisabled(false);
    } else {
      setGoalNameInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [goalName, goalTargetInvalid, validateNewGoalName]);

  useEffect(() => {
    if (
      goalTarget === '' ||
      (!isNaN(goalTarget) &&
        Number.isInteger(Number(goalTarget)) &&
        goalTarget > 0)
    ) {
      setGoalTargetInvalid(false);
      if (!goalNameInvalid) setSubmitButtonDisabled(false);
    } else {
      setGoalTargetInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [goalTarget, goalNameInvalid]);

  return (
    <Container className='goalform-container'>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              required
              type='goalName'
              value={goalName}
              onChange={e => setGoalName(e.target.value)}
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
              onChange={e => setGoalTarget(e.target.value)}
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
        <Button type='submit' disabled={submitButtonDisabled}>
          Add New Goal
        </Button>
      </Form>
    </Container>
  );
};

export default GoalForm;

GoalForm.propTypes = {
  onNewGoal: PropTypes.func.isRequired,
  validateNewGoalName: PropTypes.func.isRequired
};
