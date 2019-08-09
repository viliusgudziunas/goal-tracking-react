import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ChangeTargetForm = ({ goal, onChangeTarget, hideChangeTargetForm }) => {
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const handleFormSubmit = async e => {
    e.preventDefault();
    await fetch(`/goals/change-goal-target/${goal.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal_id: goal.id, target: newGoalTarget })
    }).then(res => {
      res.json().then(response => {
        onChangeTarget(response);
        setNewGoalTarget('');
      });
    });
    hideChangeTargetForm();
  };

  const [newGoalTargetInvalid, setNewGoalTargetInvalid] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      newGoalTarget === '' ||
      (Number.isInteger(Number(newGoalTarget)) &&
        newGoalTarget > 0 &&
        Number(newGoalTarget) !== goal.target)
    ) {
      setNewGoalTargetInvalid(false);
      setSubmitButtonDisabled(false);
    } else {
      setNewGoalTargetInvalid(true);
      setSubmitButtonDisabled(true);
    }
  }, [newGoalTarget, goal.target]);

  const handleGoalTargetChangeBack = () => {
    setNewGoalTarget('');
    setNewGoalTargetInvalid(false);
    setSubmitButtonDisabled(false);
    hideChangeTargetForm();
  };

  return (
    <Container className='goalOptions-container2'>
      <Form onSubmit={handleFormSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              required
              type='goalTarget'
              value={newGoalTarget}
              onChange={e => setNewGoalTarget(e.target.value)}
              placeholder='Enter New Goal Target'
            />
            {newGoalTargetInvalid && (
              <Container>
                <Form.Row className='goaloptions-change-goal-target-error'>
                  * Target must be different
                </Form.Row>
                <Form.Row className='goaloptions-change-goal-target-error'>
                  * Target must be a full number
                </Form.Row>
                <Form.Row className='goaloptions-change-goal-target-error'>
                  * Target must be greater than 0
                </Form.Row>
              </Container>
            )}
          </Col>
          <Col sm='true'>
            <Button type='submit' disabled={submitButtonDisabled}>
              Change Target
            </Button>
          </Col>
          <Col sm='true'>
            <Button variant='secondary' onClick={handleGoalTargetChangeBack}>
              Back
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default ChangeTargetForm;

ChangeTargetForm.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    instances: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        goal_id: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onChangeTarget: PropTypes.func.isRequired,
  hideChangeTargetForm: PropTypes.func.isRequired
};
