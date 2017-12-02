import { combineReducers } from 'redux-immutable';

import login from './login';
import list from './list';
import view from './view';
import routing from './routing';
import profile from './profile';

const newsApp = combineReducers({
    login,
    list,
    view,
    routing,
    profile,
});

export default newsApp;