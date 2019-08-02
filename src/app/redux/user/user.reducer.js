import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    startDate: new Date(Date.UTC(2018, 4)),
    personalAllowance: 30000,
    isRequestPending: false, 
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
            return {
                ...state,
                isRequestPending: true,
            }
        case UserActionTypes.FETCH_NI_RESULTS_SUCCESS:
            return {
                ...state,
                ni: action.payload,
                isRequestPending: false,
            };
        case UserActionTypes.FETCH_NI_RESULTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isRequestPending: false,
            };
        default:
            return state;
    }
};

export default userReducer;