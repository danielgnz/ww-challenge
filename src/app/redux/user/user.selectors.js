import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectStartDate = createSelector(
    [selectUser],
    (user) => user.startDate
);

export const selectPersonalAllowance = createSelector(
    [selectUser],
    (user) => user.personalAllowance
);

export const selectCurrency = createSelector(
    [selectUser],
    (user) => user.currency
);

export const selectNIContributions = createSelector(
    [selectUser],
    (user) => user.niContributions
);

export const selectRequestStatus = createSelector(
    [selectUser],
    (user) => user.isRequestPending
);

