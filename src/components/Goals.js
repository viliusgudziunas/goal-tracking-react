import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './styles/Goals.css';
import PropTypes from 'prop-types';
import Goal from './Goal';

const Goals = ({ onChangeTarget }) => {
  const goals = useSelector(state => state.goals.items);

  return (
    <Container>
      <Accordion className='goals-accordion'>
        {goals.map(goal => {
          return (
            <Goal key={goal.id} goal={goal} onChangeTarget={onChangeTarget} />
          );
        })}
      </Accordion>
    </Container>
  );
};

export default Goals;

Goals.propTypes = {
  onChangeTarget: PropTypes.func.isRequired
};
