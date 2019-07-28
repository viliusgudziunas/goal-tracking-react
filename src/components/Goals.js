import React from 'react';
import PropTypes from 'prop-types';
import './styles/Goals.css';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import Goal from './Goal';

const Goals = ({ goals }) => {
  return (
    <Container>
      <Accordion className='goals-accordion'>
        {goals.map((goal, index) => {
          return <Goal key={goal.name} name={goal.name} eventKey={index} />;
        })}
      </Accordion>
    </Container>
  );
};

export default Goals;

Goals.propTypes = {
  goals: PropTypes.array
};
