import UserActionTypes from "./user.types";
import { startFetchNi } from './user.utils';

const INITIAL_STATE = {
    startDate: new Date(Date.UTC(2018, 4)),
    personalAllowance: 30000,
    currency: '£',
    isRequestPending: false, 
    niContributions: [{
        income: 700,
        date: '2018-04-06',
        ni: 0,
    }],
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.CHANGE_START_DATE:
            return {
                ...state,
                startDate: action.payload
            };
        case UserActionTypes.CHANGE_PERSONAL_ALLOWANCE:
            return {
                ...state,
                personalAllowance: action.payload
            };
        case UserActionTypes.FETCH_NI_RESULTS_START:
            startFetchNi(action.payload);
            return {
                ...state,
                isRequestPending: true,
            }
        case UserActionTypes.FETCH_NI_RESULTS_SUCCESS:
            return {
                ...state,
                niContributions: [].concat(action.payload),
                isRequestPending: false,
            };
        case UserActionTypes.FETCH_NI_RESULTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isRequestPending: false,
            };
       
        case UserActionTypes.RESET_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;