import React, { useState, useEffect } from 'react';
import { Row, Col, Accordion, Card } from 'react-bootstrap';
import './Goal.css';
import PropTypes from 'prop-types';
import GoalOptions from '../GoalOptions/GoalOptions';
import Type1GoalSubmit from '../Type1GoalSubmit/Type1GoalSubmit';
import Type2GoalSubmit from '../Type2GoalSubmit/Type2GoalSubmit';
import {
  type1GoalCompletedService,
  type2GoalCompletedService
} from '../../services/goalService';

const Goal = ({ goal }) => {
  const [goalCardHeaderCSS, setGoalCardHeaderCSS] = useState('');
  const [goalCompleted, setGoalCompleted] = useState(false);

  useEffect(() => {
    switch (goal.target_type) {
      case 1:
        if (type1GoalCompletedService(goal.instances)) {
          setGoalCardHeaderCSS('Goal-card-header-completed');
          setGoalCompleted(true);
        } else {
          setGoalCardHeaderCSS('Goal-card-header-uncompleted');
          setGoalCompleted(false);
        }
        break;
      case 2:
        if (type2GoalCompletedService(goal.instances, goal.target)) {
          setGoalCardHeaderCSS('Goal-card-header-completed');
          setGoalCompleted(true);
        } else {
          setGoalCardHeaderCSS('Goal-card-header-uncompleted');
          setGoalCompleted(false);
        }
        break;
      default:
    }
  }, [goal.target_type, goal.instances, goal.target]);

  return (
    <Card>
      <Card.Header className={goalCardHeaderCSS}>
        <Row>
          <Accordion.Toggle
            as={Col}
            eventKey={goal.id}
            className='Goal-accordion-toggle'
          >
            {goal.name}
          </Accordion.Toggle>
          {goal.target_type === 1 ? (
            <Type1GoalSubmit goal={goal} goalCompleted={goalCompleted} />
          ) : (
            <Type2GoalSubmit goal={goal} goalCompleted={goalCompleted} />
          )}
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
