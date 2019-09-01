import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './Type1GoalSubmit.css';
import PropTypes from 'prop-types';
import { completeGoalType1Action } from '../../actions/goalActions';

const Type1GoalSubmit = ({ goal, goalCompleted }) => {
  const dispatch = useDispatch();
  const [completeButtonDisabled, setCompleteButtonDisabled] = useState(false);

  useEffect(() => {
    if (goalCompleted) setCompleteButtonDisabled(true);
  }, [goal.target_type, goalCompleted]);

  return (
    <Button
      size='sm'
      className='Type1GoalSubmit-done-button'
      onClick={() => dispatch(completeGoalType1Action(goal))}
      disabled={completeButtonDisabled}
    >
      &#10004;
    </Button>
  );
};

export default Type1GoalSubmit;

Type1GoalSubmit.propTypes = {
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
