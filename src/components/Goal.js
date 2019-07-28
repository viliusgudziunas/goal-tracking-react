import React from 'react';
import PropTypes from 'prop-types';
import './styles/Goal.css';
import { Row, Col, Button } from 'react-bootstrap';

const Goal = ({ name }) => {
  return (
    <Row className='goal-row'>
      <Col>{name}</Col>
      <Button variant='success' size='sm' className='goal-done-button'>
        Done!
      </Button>
    </Row>
  );
};

export default Goal;

Goal.propTypes = {
  name: PropTypes.string
};
