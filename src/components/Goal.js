import React, { useState, useEffect } from 'react';
import { Row, Col, Accordion, Card } from 'react-bootstrap';
import './styles/Goal.css';
import PropTypes from 'prop-types';
import GoalOptions from './GoalOptions';
import GoalSubmit from './GoalSubmit';
import { goalCompletedService } from '../services/goalService';

const Goal = ({ goal }) => {
  const [goalCardHeaderCSS, setGoalCardHeaderCSS] = useState('');
  const [goalCompleted, setGoalCompleted] = useState(false);

  useEffect(() => {
    if (goalCompletedService(goal.instances)) {
      setGoalCardHeaderCSS('goal-card-header-completed');
      setGoalCompleted(true);
    } else {
      setGoalCardHeaderCSS('goal-card-header-uncompleted');
      setGoalCompleted(false);
    }
  }, [goal.instances]);

  return (
    <Card>
      <Card.Header className={goalCardHeaderCSS}>
        <Row>
          <Accordion.Toggle
            as={Col}
            eventKey={goal.id}
            className='goal-card-accordion-toggle'
          >
            {goal.name}
          </Accordion.Toggle>
          <GoalSubmit goal={goal} goalCompleted={goalCompleted} />
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={goal.id}>
        <GoalOptions goal={goal} />
      </Accordion.Collapse>
    </Card>
  );
};

export default Goal;

Goal.propTypes = {
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
  }).isRequired
};
