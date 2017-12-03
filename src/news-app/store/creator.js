import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';
import globalState from '../middleware/globalState';
import api from '../middleware/api';

export default initialState => createStore(
    reducers,
    initialState,
    applyMiddleware(thunk, api, globalState, logger)
);
