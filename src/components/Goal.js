import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/Goal.css';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import GoalOptions from './GoalOptions';

const Goal = ({
  goal,
  eventKey,
  onDeleteGoal,
  onCompleteGoal,
  onChangeTarget
}) => {
  const [goalCardHeaderCSS, setGoalCardHeaderCSS] = useState(
    'goal-card-header-completed'
  );
  const [goalCompleteButtonDisabled, setGoalCompleteButtonDisabled] = useState(
    false
  );

  const checkDate = instances => {
    if (typeof instances === 'undefined') {
      return undefined;
    }
    if (instances.length === 0) {
      return false;
    }
    const maxDate = new Date(
      Math.max(
        ...instances.map(o => {
          return new Date(o.timestamp);
        })
      )
    );
    const currentDate = new Date();
    if (currentDate.getFullYear() > maxDate.getFullYear()) {
      return false;
    }
    if (currentDate.getMonth() > maxDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() > maxDate.getDate()) {
      return false;
    }
    return true;
  };

  const handleGoalCompleteClick = async () => {
    setGoalCompleteButtonDisabled(true);
    const goalInstance = { goal_id: goal.id };
    await fetch(`/goals/new-goal-instance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalInstance)
    }).then(res => {
      res.json().then(response => {
        onCompleteGoal(response);
      });
    });
  };

  useEffect(() => {
    if (checkDate(goal.instances)) {
      setGoalCardHeaderCSS('goal-card-header-completed');
      setGoalCompleteButtonDisabled(true);
    } else if (checkDate(goal.instances) === false) {
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
          {/* <Col>X</Col> */}
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
