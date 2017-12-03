import React, { Component } from 'react';

import immutableToJS from '../../lib/immutableToJS';
import NewsItem from './NewsItem';

class Feed extends Component {
    renderNewsList() {
        const newsList = [
            {
                id: 34,
                title: 'Какая-то новость #1',
            },{
                id: 44,
                title: 'Какая-то новость #2',
            },{
                id: 99,
                title: 'Какая-то новость #3',
            },
        ];

        return newsList.map(news => <NewsItem key={news.id} {...news} />);
    }

    render() {
        const newsList = this.renderNewsList();

        return (
            <div>
                <div>Feed</div>
                <div>{newsList}</div>
            </div>
        );
    }
}

export default immutableToJS(Feed);