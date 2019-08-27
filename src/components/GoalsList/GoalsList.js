import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './GoalsList.css';
import Goal from '../Goal/Goal';

const GoalsList = () => {
  const goals = useSelector(state => state.goals.items);

  return (
    <Accordion className='GoalsList-accordion'>
      {goals.map(goal => {
        return <Goal key={goal.id} goal={goal} />;
      })}
    </Accordion>
  );
};

export default GoalsList;
