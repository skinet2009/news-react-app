import { combineReducers } from 'redux-immutable';

import login from './login';
import feed from './feed';
import view from './view';
import routing from './routing';
import profile from './profile';

const newsApp = combineReducers({
    login,
    feed,
    view,
    routing,
    profile,
});

export default newsApp;