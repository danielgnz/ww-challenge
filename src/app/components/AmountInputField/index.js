import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TextField from '@material-ui/core/TextField';
import NumberFormatCustom from '../NumberFormatCustom';

import { changePersonalAllowance } from '../../redux/user/user.actions';
import { selectPersonalAllowance } from '../../redux/user/user.selectors';

const AmountInputField = (props) => {
  const {
    id,
    label,
    changeAllowance,
    personalAllowance,
  } = props;
  const handleChange = (event) => {
    changeAllowance(event.target.value);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={personalAllowance}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    );
};

const mapStateToProps = createStructuredSelector({
  personalAllowance: selectPersonalAllowance,
});

const mapDispatchToProps = dispatch => ({
  changeAllowance: (allowance) => dispatch(changePersonalAllowance(allowance)),
});

AmountInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  changeAllowance: PropTypes.func,
  personalAllowance: PropTypes.number,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AmountInputField);
