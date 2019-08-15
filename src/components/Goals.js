import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './styles/Goals.css';
import Goal from './Goal';

const Goals = () => {
  const goals = useSelector(state => state.goals.items);

  return (
    <Accordion className='goals-accordion'>
      {goals.map(goal => {
        return <Goal key={goal.id} goal={goal} />;
      })}
    </Accordion>
  );
};

export default Goals;
