import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { changeStartDate } from '../../redux/user/user.actions';
import { selectStartDate } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const DatePickerComponent = ({ id, label, startDate, changeDate }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      id={id}
      label={label}
      views={['year', 'month']}
      helperText="Earliest year available: 2018"
      minDate={new Date('2018-04-06')}
      maxDate={Date.now()}
      value={startDate}
      onChange={changeDate}
    />
  </MuiPickersUtilsProvider>
);

const mapStateToProps = createStructuredSelector({
  startDate: selectStartDate,
});

const mapDispatchToProps = dispatch => ({
  changeDate: (date) => dispatch(changeStartDate(date)),
});

DatePickerComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  startDate: PropTypes.date,
  changeDate: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePickerComponent);
