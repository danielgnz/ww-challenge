import { takeLatest, put, all, call } from 'redux-saga/effects';
// import axios from 'axios';
// import * as moment from 'moment';
import UserActionTypes from './user.types';

import { 
    changeStartDate, 
    changePersonalAllowance, 
    // fetchNiResultsSuccess, 
    // fetchNiResultsFailure, 
} from './user.actions';

export function* changeDate(date) {
    yield put(
        changeStartDate(date)
    )
}

export function* changeAllowance(allowance) {
    yield put(
        changePersonalAllowance(allowance)
    )
}

// BUG: function doesn't send fetchNiResultSuccess / fetchNiResultFailure to the reducer

// export function* fetchResultsAsync({ payload: { date, allowance }}) {
//     try {
//         const dateString = moment(date).format('YYYY-MM-DD');
//         const options = {
//             headers: {
//                 'x-run-date': dateString,
//             }
//         };
//         const response = yield axios.post('/v1/national-insurance', { income: allowance }, options);
//         yield put (
//             fetchNiResultsSuccess(response.data)
//         )

//     } catch(error) {
//         yield put (
//             fetchNiResultsFailure(error)
//         )
//     }
// }

export function* onChangeDate() {
    takeLatest(
        UserActionTypes.CHANGE_START_DATE,
        changeDate
    )
}

export function* onChangeAllowance() {
    takeLatest(
        UserActionTypes.CHANGE_PERSONAL_ALLOWANCE,
        changeAllowance
    )
}

// BUG: watcher doesn't forward the action to the reducer

// export function* onFetchResultsStart() {
//     takeLatest(
//         UserActionTypes.FETCH_NI_RESULTS_START,
//         fetchResultsAsync
//     )
// }

export function* userSagas() {
    yield all([
        call(onChangeDate),
        call(onChangeAllowance),
        // call(onFetchResultsStart),
    ])
}