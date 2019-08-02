import React from 'react';
import { connect } from 'react-redux';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { changeStartDate } from '../../redux/user/user.actions';
import { selectStartDate } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  startDate: selectStartDate,
});

const mapDispatchToProps = dispatch => ({
  changeDate: (date) => dispatch(changeStartDate(date))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(
    function ({ id, label, startDate, changeDate }) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id={id}
            label={label}
            views={["year", "month"]}
            helperText="Earliest year available: 2018"
            minDate={new Date("2018-04-06")}
            maxDate={new Date("2020-04-06")}
            value={startDate}
            onChange={changeDate}
          />
        </MuiPickersUtilsProvider>
      );
    });