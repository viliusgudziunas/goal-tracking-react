import React from 'react';
import './styles/GoalOptions.css';
import { Card, Button } from 'react-bootstrap';

const GoalOptions = () => {
  return (
    <Card.Body>
      <Button className='goalOptions-delete-button'>Delete Goal</Button>
    </Card.Body>
  );
};

export default GoalOptions;
