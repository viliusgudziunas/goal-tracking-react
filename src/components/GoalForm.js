import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Col, Button } from 'react-bootstrap';
import './styles/GoalForm.css';
import { addNewGoalAction } from '../actions/goalActions';
import {
  goalNameValidationService,
  goalTargetValidationService
} from '../services/validationService';
import FormError from './FormError';

const GoalForm = () => {
  const dispatch = useDispatch();
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!formDisplayed) {
      setFormDisplayed(true);
    } else {
      dispatch(
        addNewGoalAction({
          name: goalName.trim(),
          target: Number(goalTarget)
        })
      );
      setGoalName('');
      setGoalTarget('');
      setFormDisplayed(false);
    }
  };

  const goals = useSelector(state => state.goals.items);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [goalNameInvalid, setGoalNameInvalid] = useState(false);
  const [goalTargetInvalid, setGoalTargetInvalid] = useState(false);

  useEffect(() => {
    if (goalNameValidationService(goals, goalName)) {
      setGoalNameInvalid(false);
      if (!goalTargetInvalid) setSubmitButtonDisabled(false);
    } else {
      setGoalNameInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [goalName, goalTargetInvalid, goals]);

  useEffect(() => {
    if (goalTargetValidationService(goalTarget)) {
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
        {formDisplayed && (
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
                  <FormError error='Goal names must be unique' />
                  <FormError error='Goal names must be words' />
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
                  <FormError error='Target must be a full number' />
                  <FormError error='Target must be greater than 0' />
                </Container>
              )}
            </Col>
          </Form.Row>
        )}
        <Button
          type='submit'
          className='goalForm-submit-button'
          disabled={submitButtonDisabled}
        >
          Add New Goal
        </Button>
      </Form>
    </Container>
  );
};

export default GoalForm;
