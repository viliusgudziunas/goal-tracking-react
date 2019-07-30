import React from 'react';
import './styles/GoalsHeader.css';
import { Row, Col } from 'react-bootstrap';

const GoalsHeader = () => {
  return (
    <Row className='goals-header'>
      <Col>Goals Tracker</Col>
    </Row>
  );
};

export default GoalsHeader;
