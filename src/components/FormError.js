import React from 'react';
import { Form } from 'react-bootstrap';
import './styles/FormError.css';
import PropTypes from 'prop-types';

const FormError = ({ error }) => {
  return <Form.Row className='formerrors-error'>* {error}</Form.Row>;
};

export default FormError;

FormError.propTypes = {
  error: PropTypes.string.isRequired
};
