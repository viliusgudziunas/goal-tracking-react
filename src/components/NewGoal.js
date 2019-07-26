import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './styles/Components.css';

const NewGoal = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='div1'>
      <Button size='sm'>New Goal</Button>
    </div>
  );
};

export default NewGoal;
