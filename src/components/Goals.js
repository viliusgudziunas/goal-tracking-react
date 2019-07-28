import React from 'react';
import PropTypes from 'prop-types';
import './styles/Goals.css';
import { Container, Row, Col } from 'react-bootstrap';
import Goal from './Goal';

const Goals = ({ goals }) => {
  return (
    <Container>
      <Row className='goals-header'>
        <Col>Goal Name</Col>
      </Row>
      {goals.map(goal => {
        return <Goal key={goal.name} name={goal.name} />;
      })}
    </Container>
  );
};

export default Goals;

Goals.propTypes = {
  goals: PropTypes.array
};
