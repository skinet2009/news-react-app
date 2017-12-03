import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import immutableToJS from '../../lib/immutableToJS';
import NewsItem from './NewsItem';

class Feed extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        tags: PropTypes.array,
        isLoad: PropTypes.bool,
        countPage: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        currentFilter: PropTypes.string,

        fetchInitData: PropTypes.func.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        onChangeFilter: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.fetchInitData();
    }

    handleChangeTag(tag) {
        this.props.onChangeFilter(tag);
    }

    handleClearFilter() {
        this.props.onChangeFilter();
    }

    renderNewsList() {
        return this.props.list.map(news => <NewsItem key={news.id} {...news} />);
    }

    renderLoadMoreButton() {
        const { countPage, currentPage, onLoadMore } = this.props;

        if (countPage <= currentPage + 1) {
            return '';
        }

        return (
            <div
                className="button button_active button_full"
                onClick={onLoadMore}
            >Загрузить еще ({currentPage + 1} из {countPage})</div>
        );
    }

    renderTags() {
        const { tags } = this.props;

        if (isEmpty(tags)) {
            return '';
        }

        return (
            <aside className="app-blocks__sidebar">
                <div className="app-blocks__sidebar-header">Популярные теги</div>
                <div className="app-blocks__sidebar-tags-wrap">
                    {tags.map(tag => {
                        const upperTag = tag.split(' ').join('').toUpperCase();

                        return (
                            <div
                                key={upperTag}
                                onClick={() => this.handleChangeTag(tag)}
                                className="app-blocks__sidebar-tags"
                            >{upperTag}</div>
                        );
                    })}
                </div>
            </aside>
        );
    }

    renderClearFilterButton() {
        if (!this.props.currentFilter) {
            return '';
        }

        return (
            <div className="app-blocks__center-header-buttons">
                <div
                    title="Показать все статьи"
                    onClick={::this.handleClearFilter}
                    className="button button_active"
                >Все</div>
            </div>
        )
    }

    render() {
        const newsList = this.renderNewsList();
        const loadMoreButton = this.renderLoadMoreButton();
        const clearFilterButton = this.renderClearFilterButton();
        const tags = this.renderTags();

        return (
            <div className={this.props.isLoad ? 'loading' : ''}>
                <div className="app-blocks__wrap">
                    <div className="app-blocks__center">
                        <div className="app-blocks__center-header">
                            <div className="app-blocks__center-header-title">
                                Список статей
                            </div>
                            {clearFilterButton}
                        </div>

                        <div className="news-feed">{newsList}</div>
                        {loadMoreButton}
                    </div>

                    {tags}
                </div>
            </div>
        );
    }
}

export default immutableToJS(Feed);