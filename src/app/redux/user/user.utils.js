import axios from 'axios';
import * as moment from 'moment';
import { fetchNiResultsSuccess, fetchNiResultsFailure } from './user.actions';

const getDateString = date => moment(date).format('YYYY-MM-DD');

const getAllDates = (startDate, lastRunDate) => {
    const splitStartDate = startDate.split('-');
    const startYear = parseInt(splitStartDate[0]);
    const lastYear = parseInt(lastRunDate.split('-')[0]);
    const allDates = [];

    for(let year = startYear; year < lastYear; year++) {
        const date = [year, splitStartDate[1], splitStartDate[2]].join('-');
        allDates.push(date);
    }
    allDates.push(lastRunDate);

    return allDates;
}

const getNiData = allowance => dateString => {
    const options = {
        headers: {
            'x-run-date': dateString,
        }
    };
    return axios.post('/v1/national-insurance', { income: allowance }, options)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export const startFetchNi = ({ dispatch, date, allowance }) => {
    const startDate = getDateString(date);
    const lastRunDate = getDateString(Date.now());
    const dates = getAllDates(startDate, lastRunDate);
    const getNiContributionsForDate = getNiData(allowance);
    const fetchRequests = dates.map(date => getNiContributionsForDate(date));

    axios.all(fetchRequests)
        .then(data => dispatch(fetchNiResultsSuccess(data)))
        .catch(error => dispatch(fetchNiResultsFailure(error)));
}