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