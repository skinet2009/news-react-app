import ActionTypes from './Types';

export const confirm = ({ login, password }) => (dispatch, getState) => {
    const uLogin = getState().getIn(['login', 'login']);
    const uPassword = getState().getIn(['login', 'password']);
    let error = '';

    if (uLogin !== login || uPassword !== password) {
        error = 'Не верный логин и/или пароль';
    }

    if (!password) {
        error = 'Введите пароль';
    }

    if (!login) {
        error = 'Введите логин';
    }

    if (error) {
        return dispatch({
            type: ActionTypes.LOGIN_ERROR,
            data: { error },
        });
    }

    dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        data: {},
    });

    dispatch({
        type: ActionTypes.REDIRECT,
        pathname: '/',
    });
};

export const clearError = () => dispatch => dispatch({
    type: ActionTypes.LOGIN_ERROR,
    data: { error: '' },
});
