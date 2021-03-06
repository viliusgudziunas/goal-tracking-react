import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ChangeGoalForm.css';
import PropTypes from 'prop-types';
import { changeGoalAction } from '../../actions/goalActions';
import {
  goalNameValidationService,
  goalTargetValidationService
} from '../../services/validationService';
import FormError from '../FormError/FormError';

const ChangeGoalForm = ({ goal, hideChangeGoalForm }) => {
  const dispatch = useDispatch();
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!(newGoalName === '' && newGoalTarget === '')) {
      dispatch(changeGoalAction(goal, newGoalName, newGoalTarget));
    }
    setNewGoalName('');
    setNewGoalTarget('');
    hideChangeGoalForm();
  };

  const goals = useSelector(state => state.goals.items);
  const [newGoalNameInvalid, setNewGoalNameInvalid] = useState(false);
  const [newGoalTargetInvalid, setNewGoalTargetInvalid] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (goalNameValidationService(goals, newGoalName)) {
      setNewGoalNameInvalid(false);
      if (!newGoalTargetInvalid) setSubmitButtonDisabled(false);
    } else {
      setNewGoalNameInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [goals, newGoalName, newGoalTargetInvalid]);

  useEffect(() => {
    if (
      goalTargetValidationService(newGoalTarget) &&
      Number(newGoalTarget) !== goal.target
    ) {
      setNewGoalTargetInvalid(false);
      if (!newGoalNameInvalid) setSubmitButtonDisabled(false);
    } else {
      setNewGoalTargetInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [newGoalTarget, goal.target, newGoalNameInvalid]);

  const handleChangeGoalBackButtonClick = () => {
    setNewGoalTarget('');
    setNewGoalTargetInvalid(false);
    setSubmitButtonDisabled(false);
    hideChangeGoalForm();
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container className='changeGoalForm-container'>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Form.Row} controlId='formNewGoalName'>
          <Form.Label column sm='3'>
            Goal Name
          </Form.Label>
          <Col>
            <Form.Control
              required
              value={newGoalName}
              onChange={e => setNewGoalName(e.target.value)}
              placeholder='Enter New Goal Name'
              ref={inputRef}
            />
            {newGoalNameInvalid && (
              <Container>
                <FormError error='Goal names must be unique' />
                <FormError error='Goal names must be words' />
              </Container>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId='formNewGoalTarget'>
          <Form.Label column sm='3'>
            Goal Target
          </Form.Label>
          <Col>
            <Form.Control
              required
              value={newGoalTarget}
              onChange={e => setNewGoalTarget(e.target.value)}
              placeholder='Enter New Goal Target'
            />
            {newGoalTargetInvalid && (
              <Container>
                <FormError error='Target must be different' />
                <FormError error='Target must be a full number' />
                <FormError error='Target must be greater than 0' />
              </Container>
            )}
          </Col>
        </Form.Group>
        <Form.Row className='changeGoalForm-buttons-row'>
          <Button
            type='submit'
            className='changeGoalForm-submit-button'
            disabled={submitButtonDisabled}
          >
            Change Goal
          </Button>
          <Button
            className='changeGoalForm-back-button'
            onClick={handleChangeGoalBackButtonClick}
          >
            &nbsp; | &nbsp;Back
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default ChangeGoalForm;

ChangeGoalForm.propTypes = {
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
  hideChangeGoalForm: PropTypes.func.isRequired
};
