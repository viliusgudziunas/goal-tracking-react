import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeGoalTargetAction } from '../actions/goalActions';
import { goalTargetValidationService } from '../services/validationService';
import FormError from './FormError';

const ChangeTargetForm = ({ goal, hideChangeTargetForm }) => {
  const dispatch = useDispatch();
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const handleFormSubmit = async e => {
    e.preventDefault();
    dispatch(changeGoalTargetAction(goal, newGoalTarget));
    setNewGoalTarget('');
    hideChangeTargetForm();
  };

  const [newGoalTargetInvalid, setNewGoalTargetInvalid] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      goalTargetValidationService(newGoalTarget) &&
      Number(newGoalTarget) !== goal.target
    ) {
      setNewGoalTargetInvalid(false);
      setSubmitButtonDisabled(false);
    } else {
      setNewGoalTargetInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [newGoalTarget, goal.target]);

  const handleGoalTargetChangeBack = () => {
    setNewGoalTarget('');
    setNewGoalTargetInvalid(false);
    setSubmitButtonDisabled(false);
    hideChangeTargetForm();
  };

  return (
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
              <Container>
                <FormError error='Target must be different' />
                <FormError error='Target must be a full number' />
                <FormError error='Target must be greater than 0' />
              </Container>
            )}
          </Col>
          <Col sm='true'>
            <Button type='submit' disabled={submitButtonDisabled}>
              Change Target
            </Button>
          </Col>
          <Col sm='true'>
            <Button variant='secondary' onClick={handleGoalTargetChangeBack}>
              Back
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default ChangeTargetForm;

ChangeTargetForm.propTypes = {
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
  hideChangeTargetForm: PropTypes.func.isRequired
};
