import React from 'react';
import PropTypes from 'prop-types';
import './styles/Components.css';
import { Container } from 'react-bootstrap';
import Goal from './Goal';

const Goals = ({ goals }) => {
  return (
    <Container className="Container1">
      {goals.map(goal => {
        console.log(goal.name);
        return <Goal key={goal.name} name={goal.name} />;
      })}
    </Container>
  );
};

export default Goals;

Goals.propTypes = {
  goals: PropTypes.object
};
