import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Goal = ({ name }) => {
  return (
    <Row>
      <Col sm={6}>{name}</Col>
      <Col>Hello</Col>
      <Col>
        <Button variant="success" size="sm">
          Done!
        </Button>
      </Col>
    </Row>
  );
};

export default Goal;
