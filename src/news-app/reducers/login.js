import ActionTypes from './../actions/Types';

const login = (state = {}, action) => {
    const { type, data } = action;

    switch (type) {
        case ActionTypes.LOGIN_ERROR:
            return state.set('error', data.error);
        case ActionTypes.REDIRECT:
            return state.set('error', '');
        case ActionTypes.LOGIN_SUCCESS:
            return state.set('isAuth', true);
        default:
            return state;
    }
};

export default login;
