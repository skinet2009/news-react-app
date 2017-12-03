import { CALL_API } from './api';

export default store => next => action => {
    if (typeof action[CALL_API] !== 'undefined') {
        return next(action);
    }

    const globalState = store.getState();

    return next(Object.assign({}, action, { globalState }));
};
