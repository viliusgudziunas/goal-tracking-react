import React from 'react';
import PropTypes from 'prop-types';
import './styles/Goal.css';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import GoalOptions from './GoalOptions';

const Goal = ({ name, target, eventKey, onDeleteGoal }) => {
  return (
    <Card>
      <Card.Header className='goal-card-header'>
        <Row>
          <Accordion.Toggle
            as={Col}
            eventKey={eventKey}
            className='goal-card-accordion-toggle'
          >
            {name}
          </Accordion.Toggle>
          <Col>X</Col>
          <Button variant='success' size='sm' className='goal-done-button'>
            Done!
          </Button>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <GoalOptions name={name} target={target} onDeleteGoal={onDeleteGoal} />
      </Accordion.Collapse>
    </Card>
  );
};

export default Goal;

Goal.propTypes = {
  name: PropTypes.string,
  target: PropTypes.number,
  eventKey: PropTypes.number,
  onDeleteGoal: PropTypes.func
};
