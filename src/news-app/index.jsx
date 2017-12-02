import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { storeCreator, initialState } from './store';
import { ALLOW_URLS } from './lib/AppConstants';
import './media/index.css';

console.warn(ALLOW_URLS);
const store = storeCreator(fromJS(initialState));

// TODO: Сделать через контейнеры: const View = require('./containers/View').default;
const App = require('./components/App').default;
const Login = require('./components/Login').default;
const Feed = require('./components/Feed').default;
const View = require('./components/View').default;
const Profile = require('./components/Profile').default;

const createSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return state => {
        const routingState = state.get('routing'); // or state.routing

        if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }
        return prevRoutingStateJS;
    };
};
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState(),
});

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path={ALLOW_URLS.LOGIN} component={Login} />
            <Route component={App}>
                <Route path={ALLOW_URLS.FEED} component={Feed} />
                <Route path={`${ALLOW_URLS.VIEW}/:post`} component={View} />
                <Route path={`${ALLOW_URLS.PROFILE}`} component={Profile} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
