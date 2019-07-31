import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Goal.css';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import GoalOptions from './GoalOptions';

const Goal = ({ goal, eventKey, onDeleteGoal }) => {
  const [goalInstances, setGoalInstances] = useState(goal.instances);
  const [goalCompleted, setGoalCompleted] = useState(false);

  let goalCardHeaderCSS = 'goal-card-header-uncompleted';
  if (goal.name === 'Working Out') {
    goalCardHeaderCSS = 'goal-card-header-completed';
  }

  const handleGoalCompleteClick = async () => {
    console.log(goalInstances);
    console.log(goal.name);
    const goalInstance = { goal_id: goal.id };
    const response = await fetch(`/new_goal_instance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalInstance)
    });
    if (response.ok) {
      const currentTimestamp = new Date();
      setGoalInstances(currentGoalInstances => [
        ...currentGoalInstances,
        { goal_id: goal.id, timestamp: currentTimestamp }
      ]);
      goalCardHeaderCSS = 'goal-card-header-completed';
    }
  };

  // const decideStyles = () => {
  //   return 'goal-card-header';
  // };

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
          >
            &#10004;
          </Button>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <GoalOptions
          name={goal.name}
          target={goal.target}
          onDeleteGoal={onDeleteGoal}
        />
      </Accordion.Collapse>
    </Card>
  );
};

export default Goal;

Goal.propTypes = {
  goal: PropTypes.object,
  eventKey: PropTypes.number,
  onDeleteGoal: PropTypes.func
};
