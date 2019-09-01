import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './Type2GoalSubmit.css';
import PropTypes from 'prop-types';
import { completeGoalType2Action } from '../../actions/goalActions';
import { goalCompletedHoursTodayService } from '../../services/goalService';
import { hoursCompletedValidationService } from '../../services/validationService';

const Type2GoalSubmit = ({ goal, goalCompleted }) => {
  const dispatch = useDispatch();
  const [completedHoursFormField, setCompletedHoursFormField] = useState('');
  const [goalSubmitFormDisplayed, setGoalSubmitFormDisplayed] = useState(false);
  const [completedHours, setCompletedHours] = useState(0);
  const [completeButtonDisabled, setCompleteButtonDisabled] = useState(true);

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(completeGoalType2Action(goal, completedHoursFormField));
    setCompletedHoursFormField('');
    setGoalSubmitFormDisplayed(false);
    setCompleteButtonDisabled(true);
  };

  useEffect(() => {
    setCompletedHours(goalCompletedHoursTodayService(goal.instances));
  }, [goal.instances]);

  const handleDisplayFormButtonClick = () => {
    setGoalSubmitFormDisplayed(true);
    setCompleteButtonDisabled(false);
  };

  const inputRef = useRef();
  const nodeRef = useRef();

  const handleClick = e => {
    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      setCompletedHoursFormField('');
      setGoalSubmitFormDisplayed(false);
      setCompleteButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (goalSubmitFormDisplayed) inputRef.current.focus();
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [goalSubmitFormDisplayed]);

  const handleCompletedHoursFormFieldChange = e => {
    setCompletedHoursFormField(e.target.value);
    if (hoursCompletedValidationService(e.target.value)) {
      setCompleteButtonDisabled(false);
    } else {
      setCompleteButtonDisabled(true);
    }
  };

  if (goalCompleted) {
    return (
      <Container className='Type2GoalSubmit-container'>
        Hours Completed:&nbsp;
        <Col className='Type2GoalSubmit-hours-completed-col'>
          {completedHours}
        </Col>
        <Button
          variant='success'
          type='submit'
          size='sm'
          className='Type2GoalSubmit-done-button Type2GoalSubmit-goal-done-button'
          disabled={completeButtonDisabled}
        >
          &#10004;
        </Button>
      </Container>
    );
  }

  if (goalSubmitFormDisplayed) {
    return (
      <Form inline='true' onSubmit={handleFormSubmit} ref={nodeRef}>
        Hours Completed:&nbsp;
        <Form.Control
          required
          size='sm'
          className='Type2GoalSubmit-form-control'
          value={completedHoursFormField}
          onChange={handleCompletedHoursFormFieldChange}
          ref={inputRef}
        />
        <Button
          variant='success'
          type='submit'
          size='sm'
          className='Type2GoalSubmit-done-button'
          disabled={completeButtonDisabled}
        >
          &#10004;
        </Button>
      </Form>
    );
  }

  return (
    <Container className='Type2GoalSubmit-container'>
      Hours Completed:&nbsp;
      <Button
        className='Type2GoalSubmit-hours-completed-button'
        onClick={handleDisplayFormButtonClick}
      >
        {completedHours}
      </Button>
      <Button
        variant='success'
        type='submit'
        size='sm'
        className='Type2GoalSubmit-done-button'
        disabled={completeButtonDisabled}
      >
        &#10004;
      </Button>
    </Container>
  );
};
export default Type2GoalSubmit;

Type2GoalSubmit.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    target_type: PropTypes.number.isRequired,
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
  goalCompleted: PropTypes.bool.isRequired
};
