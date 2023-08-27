import * as user from './constants';

export const getAllUsers = (payload) => ({
    type: user.GET_ALL_USERS,
    payload
})