import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import './styles/Goal.css';
import PropTypes from 'prop-types';
import GoalOptions from './GoalOptions';
import goalService from './services/goalService';

const Goal = ({
  goal,
  eventKey,
  onDeleteGoal,
  onCompleteGoal,
  onChangeTarget
}) => {
  const [goalCompleteButtonDisabled, setGoalCompleteButtonDisabled] = useState(
    false
  );

  const handleGoalCompleteClick = async () => {
    setGoalCompleteButtonDisabled(true);
    await fetch(`/goals/new-goal-instance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal_id: goal.id })
    }).then(res => {
      res.json().then(response => {
        onCompleteGoal(response);
      });
    });
  };

  const [goalCardHeaderCSS, setGoalCardHeaderCSS] = useState('');

  useEffect(() => {
    if (goalService.checkGoalCompleteToday(goal.instances)) {
      setGoalCardHeaderCSS('goal-card-header-completed');
      setGoalCompleteButtonDisabled(true);
    } else if (goalService.checkGoalCompleteToday(goal.instances) === false) {
      setGoalCardHeaderCSS('goal-card-header-uncompleted');
      setGoalCompleteButtonDisabled(false);
    }
  }, [goal.instances]);

  return (
    <Card>
      <Card.Header className={goalCardHeaderCSS}>
        <Row>
          <Accordion.Toggle
            as={Col}
            eventKey={eventKey}
            className='goal-card-accordion-toggle'
          >
            {goal.name}
          </Accordion.Toggle>
          <Button
            variant='success'
            size='sm'
            className='goal-done-button'
            onClick={handleGoalCompleteClick}
            disabled={goalCompleteButtonDisabled}
          >
            &#10004;
          </Button>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <GoalOptions
          goal={goal}
          onDeleteGoal={onDeleteGoal}
          onChangeTarget={onChangeTarget}
        />
      </Accordion.Collapse>
    </Card>
  );
};

export default Goal;

Goal.propTypes = {
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
  eventKey: PropTypes.number.isRequired,
  onDeleteGoal: PropTypes.func.isRequired,
  onCompleteGoal: PropTypes.func.isRequired,
  onChangeTarget: PropTypes.func.isRequired
};
