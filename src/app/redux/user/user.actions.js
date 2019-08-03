import UserActionTypes from './user.types';

export const changeStartDate = (date) => ({
    type: UserActionTypes.CHANGE_START_DATE,
    payload: date,
});

export const changePersonalAllowance = (allowance) => ({
    type: UserActionTypes.CHANGE_PERSONAL_ALLOWANCE,
    payload: allowance,
});

export const fetchNiResultsStart = (data) => ({
    type: UserActionTypes.FETCH_NI_RESULTS_START,
    payload: data,
});

export const fetchNiResultsSuccess = (results) => ({
    type: UserActionTypes.FETCH_NI_RESULTS_SUCCESS,
    payload: results,
});

export const fetchNiResultsFailure = (error) => ({
    type: UserActionTypes.FETCH_NI_RESULTS_FAILURE,
    payload: error,
});

export const resetData = () => ({
    type: UserActionTypes.RESET_DATA,
});