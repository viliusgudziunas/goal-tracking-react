import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/GoalForm.css';
import { Container, Form, Col, Button } from 'react-bootstrap';

const GoalForm = ({ onNewGoal, validateGoalName }) => {
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [goalNameInvalid, setGoalNameInvalid] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisableSubmitButton(true);
    const goal = { name: goalName.trim(), target: Number(goalTarget) };
    const response = await fetch('/goals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    });
    if (response.ok) {
      onNewGoal(goal);
      setGoalName('');
      setGoalTarget('');
    }
    setDisableSubmitButton(false);
  };

  const handleGoalNameChange = e => {
    if (validateGoalName(e.target.value)) {
      setDisableSubmitButton(false);
      setGoalNameInvalid(false);
    } else {
      setDisableSubmitButton(true);
      setGoalNameInvalid(true);
    }
    setGoalName(e.target.value);
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
              <Form.Row className='goalform-goal-name-error'>
                * Goal name already exists
              </Form.Row>
            )}
          </Col>
          <Col>
            <Form.Control
              required
              type='goalTarget'
              value={goalTarget}
              onChange={e => setGoalTarget(e.target.value)}
              placeholder='Enter Target'
            />
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
