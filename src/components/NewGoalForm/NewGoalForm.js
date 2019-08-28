import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Col, Button, Row } from 'react-bootstrap';
import './NewGoalForm.css';
import { addNewGoalAction } from '../../actions/goalActions';
import {
  goalNameValidationService,
  goalTargetValidationService
} from '../../services/validationService';
import FormError from '../FormError/FormError';

const NewGoalForm = () => {
  const dispatch = useDispatch();
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTargetType, setGoalTargetType] = useState(1);
  const [goalTarget, setGoalTarget] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addNewGoalAction({
        name: goalName.trim(),
        target_type: goalTargetType,
        target: goalTarget
      })
    );
    setGoalName('');
    setGoalTargetType(1);
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

  const goals = useSelector(state => state.goals.items);
  const [goalNameInvalid, setGoalNameInvalid] = useState(false);
  const [goalTargetInvalid, setGoalTargetInvalid] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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

  const inputRef = useRef();

  useEffect(() => {
    if (formDisplayed) inputRef.current.focus();
  }, [formDisplayed]);

  return (
    <Container className='NewGoalForm-form-container'>
      {formDisplayed ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Form.Row} controlId='newGoalName'>
            <Form.Label column sm='3'>
              Goal Name
            </Form.Label>
            <Col>
              <Form.Control
                required
                value={goalName}
                onChange={e => setGoalName(e.target.value)}
                placeholder='Enter Goal Name'
                ref={inputRef}
              />
              {goalNameInvalid && (
                <Container>
                  <FormError error='Goal names must be unique' />
                  <FormError error='Goal names must be words' />
                </Container>
              )}
            </Col>
          </Form.Group>
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
          <Form.Group as={Form.Row} controlId='newGoalTarget'>
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
          <Row className='NewGoalForm-buttons-row'>
            <Button
              type='submit'
              className='NewGoalForm-add-new-goal-button'
              disabled={submitButtonDisabled}
            >
              Add New Goal
            </Button>
            <Col sm='1'>|</Col>
            <Button
              className='NewGoalForm-back-button'
              onClick={handleNewGoalBackButtonClick}
            >
              Back
            </Button>
          </Row>
        </Form>
      ) : (
        <Button
          className='NewGoalForm-add-new-goal-button'
          onClick={() => setFormDisplayed(true)}
        >
          Add New Goal
        </Button>
      )}
    </Container>
  );
};

export default NewGoalForm;
