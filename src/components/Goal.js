import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './styles/Goal.css';
import PropTypes from 'prop-types';
import { completeGoalAction } from '../actions/goalActions';
import GoalOptions from './GoalOptions';
import { goalCompletedService } from '../services/goalService';

const Goal = ({ goal }) => {
  const dispatch = useDispatch();
  const [goalCardHeaderCSS, setGoalCardHeaderCSS] = useState('');
  const [goalCompleteButtonDisabled, setGoalCompleteButtonDisabled] = useState(
    false
  );

  useEffect(() => {
    if (goalCompletedService(goal.instances)) {
      setGoalCardHeaderCSS('goal-card-header-completed');
      setGoalCompleteButtonDisabled(true);
    } else {
      setGoalCardHeaderCSS('goal-card-header-uncompleted');
      setGoalCompleteButtonDisabled(false);
    }
  }, [goal.instances]);
  console.log(goal);

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
          {goal.target_type === 2 ? (
            <Col>
              <Form>
                <Form.Control required />
                <Button
                  variant='success'
                  size='sm'
                  className='goal-done-button'
                  onClick={() => dispatch(completeGoalAction(goal))}
                  disabled={goalCompleteButtonDisabled}
                >
                  &#10004;
                </Button>
              </Form>
            </Col>
          ) : (
            <Button
              variant='success'
              size='sm'
              className='goal-done-button'
              onClick={() => dispatch(completeGoalAction(goal))}
              disabled={goalCompleteButtonDisabled}
            >
              &#10004;
            </Button>
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
