import * as user from './constants';

export const userLogin = (payload) => ({
    type: user.USER_LOGIN,
    payload
});

export const userLogout = () => ({
    type: user.USER_LOGOUT
})