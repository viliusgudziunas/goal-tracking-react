import React from 'react';
import PropTypes from 'prop-types';
import './styles/Goal.css';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import GoalOptions from './GoalOptions';

const Goal = ({ goal, eventKey, onDeleteGoal, onCompleteGoal }) => {
  let goalCardHeaderCSS = 'goal-card-header-uncompleted';
  if (goal.name === 'Working Out') {
    goalCardHeaderCSS = 'goal-card-header-completed';
  }

  const handleGoalCompleteClick = async () => {
    const goalInstance = { goal_id: goal.id };
    const response = await fetch(`/new_goal_instance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalInstance)
    });
    if (response.ok) {
      onCompleteGoal(goal);
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
  onCompleteGoal: PropTypes.func.isRequired
};
