import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import ActionTypes from '../actions/Types';
import { news } from '../lib/stubData';

const feed = (state = {}, action) => {
    const { type, data } = action;
    const currentFilter = state.get('currentFilter');
    let countPage = Math.floor(news.length / state.get('countNewsOnPage'));

    if (currentFilter) {
        const filteredNews = news.filter(item => item.tags.indexOf(currentFilter) !== -1);

        countPage = Math.floor(filteredNews.length / state.get('countNewsOnPage'));
    }

    switch (type) {
        case ActionTypes.LIST_REQUEST:
            return state.set('isLoad', true);
        case ActionTypes.LIST_CHANGE_FILTER:
            return state.set('currentFilter', data.tag);
        case ActionTypes.LIST_REQUEST_SUCCESS:
            return state
                .set('isLoad', false)
                .set('list', fromJS(data.list))
                .set('currentPage', 0)
                .set('countPage', countPage);
        case ActionTypes.LIST_LOAD_MORE_SUCCESS: {
            let newState = state;

            if (!isEmpty(data.list)) {
                newState = newState.set('currentPage', newState.get('currentPage') + 1);
            }

            return newState
                .set('isLoad', false)
                .set('list', newState.get('list').concat(fromJS(data.list)))
                .set('countPage', countPage);
        }
        default:
            return state;
    }
};

export default feed;
