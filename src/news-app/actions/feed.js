import ActionTypes from './Types';

import { news as newsData } from '../lib/stubData';
import { CONTENT_BLOCKS } from '../lib/AppConstants';

// Выбираем только нужную для этой страницы информацию
const news = newsData.map(item => {
    return {
        id: item.id,
        title: item.title,
        image: item.blocks[CONTENT_BLOCKS.IMAGE],
        likes: item.likes,
        tags: item.tags,
    };
});

export const loadList = (dispatch, getState, page = 0) => {
    const feed = getState().get('feed');
    const countOnPage = feed.get('countNewsOnPage');
    const currentFilter = feed.get('currentFilter');
    let data = news;

    if (currentFilter) {
        data = data.filter(item => item.tags.indexOf(currentFilter) !== -1);
    }

    data = data.slice(countOnPage * page, countOnPage * (page + 1));

    dispatch({
        type: page ? ActionTypes.LIST_LOAD_MORE_SUCCESS : ActionTypes.LIST_REQUEST_SUCCESS,
        data: { list: data },
    });
};

export const fetchInitData = () => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LIST_REQUEST,
        data: {},
    });

    window.setTimeout(() => {
        loadList(dispatch, getState);
    }, 1000);
};

export const loadMore = () => (dispatch, getState) => {
    const page = getState().getIn(['feed', 'currentPage']) + 1;

    dispatch({
        type: ActionTypes.LIST_REQUEST,
        data: {},
    });

    window.setTimeout(() => {
        loadList(dispatch, getState, page);
    }, 1000);
};

export const changeFilter = (tag = '') => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LIST_CHANGE_FILTER,
        data: { tag },
    });

    dispatch({
        type: ActionTypes.LIST_REQUEST,
        data: {},
    });

    window.setTimeout(() => {
        loadList(dispatch, getState);
    }, 1000);
};
