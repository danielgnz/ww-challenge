import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TextField from '@material-ui/core/TextField';
import NumberFormatCustom from '../NumberFormatCustom';

import { changePersonalAllowance } from '../../redux/user/user.actions';
import { selectPersonalAllowance } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
    personalAllowance: selectPersonalAllowance,
});

const mapDispatchToProps = dispatch => ({
    changeAllowance: (allowance) => dispatch(changePersonalAllowance(allowance)),
});

const AmountInputField = ({ id, label, changeAllowance, personalAllowance, ...otherProps}) => {
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
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(AmountInputField);