import * as user from './constants';

const initialState = {
    data: [],
}

const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case user.GET_ALL_USERS:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}

export default usersReducer;