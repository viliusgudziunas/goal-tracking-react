import React from 'react';
import './Header.css';
import { Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <Row className='Header-row'>
      <Col>Goals Tracker</Col>
    </Row>
  );
};

export default Header;
