import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import './styles/Goals.css';
import PropTypes from 'prop-types';
import Goal from './Goal';

const Goals = ({ goals, onDeleteGoal, onCompleteGoal, onChangeTarget }) => {
  return (
    <Container>
      <Accordion className='goals-accordion'>
        {goals.map((goal, index) => {
          return (
            <Goal
              key={goal.id}
              goal={goal}
              eventKey={index}
              onDeleteGoal={onDeleteGoal}
              onCompleteGoal={onCompleteGoal}
              onChangeTarget={onChangeTarget}
            />
          );
        })}
      </Accordion>
    </Container>
  );
};

export default Goals;

Goals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onDeleteGoal: PropTypes.func.isRequired,
  onCompleteGoal: PropTypes.func.isRequired,
  onChangeTarget: PropTypes.func.isRequired
};
