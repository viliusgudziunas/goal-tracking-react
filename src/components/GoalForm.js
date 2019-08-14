import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Col, Button } from 'react-bootstrap';
import './styles/GoalForm.css';
import { addNewGoalAction } from '../actions/goalActions';
import {
  goalNameValidationService,
  goalTargetValidationService
} from '../services/validationService';

const GoalForm = () => {
  const dispatch = useDispatch();
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addNewGoalAction({
        name: goalName.trim(),
        target: Number(goalTarget)
      })
    );
    setGoalName('');
    setGoalTarget('');
  };

  const goals = useSelector(state => state.goals.items);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [goalNameInvalid, setGoalNameInvalid] = useState(false);
  const [goalTargetInvalid, setGoalTargetInvalid] = useState(false);

  useEffect(() => {
    if (goalName === '' || goalNameValidationService(goals, goalName)) {
      setGoalNameInvalid(false);
      if (!goalTargetInvalid) setSubmitButtonDisabled(false);
    } else {
      setGoalNameInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [goalName, goalTargetInvalid, goals]);

  useEffect(() => {
    if (goalTarget === '' || goalTargetValidationService(goalTarget)) {
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
