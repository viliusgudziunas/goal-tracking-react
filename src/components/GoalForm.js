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
  const [goalTargetType, setGoalTargetType] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    if (!formDisplayed) {
      setFormDisplayed(true);
    } else {
      dispatch(
        addNewGoalAction({
          name: goalName.trim(),
          target_type: goalTargetType,
          target: goalTarget
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

  const handleNewGoalBackButtonClick = () => {
    setGoalName('');
    setGoalTarget('');
    setFormDisplayed(false);
  };

  const handleTargetTypeChange = e => {
    switch (e.target.value) {
      case 'Track once a day e.g. Working Out':
        setGoalTargetType(1);
        break;
      case 'Track hours every day e.g. Reading':
        setGoalTargetType(2);
        break;
      default:
        break;
    }
  };

  return (
    <Container className='goalform-container'>
      <Form onSubmit={handleSubmit}>
        {formDisplayed && (
          <Form.Group as={Form.Row} controlId='formGoalName'>
            <Form.Label column sm='3'>
              Goal Name
            </Form.Label>
            <Col>
              <Form.Control
                required
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
          </Form.Group>
        )}
        {formDisplayed && (
          <Form.Group as={Form.Row} controlId='formGoalTargetChoice'>
            <Form.Label column sm='3'>
              Target Type
            </Form.Label>
            <Col>
              <Form.Control as='select' onChange={handleTargetTypeChange}>
                <option>Track once a day e.g. Working Out</option>
                <option>Track hours every day e.g. Reading</option>
              </Form.Control>
            </Col>
          </Form.Group>
        )}
        {formDisplayed && (
          <Form.Group as={Form.Row} controlId='formGoalTarget'>
            <Form.Label column sm='3'>
              Goal Target
            </Form.Label>
            <Col>
              <Form.Control
                required
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
          </Form.Group>
        )}
        <Button
          type='submit'
          className='goalForm-submit-button'
          disabled={submitButtonDisabled}
        >
          Add New Goal
        </Button>
        {formDisplayed && (
          <Button
            className='goalForm-back-button'
            onClick={handleNewGoalBackButtonClick}
          >
            &nbsp; | &nbsp;Back
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default GoalForm;
