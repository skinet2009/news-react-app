import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class NewsItem extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }

    render() {
        const { id, title } = this.props;

        return (
            <Link to={`/news/${id}`}>
                <div>Заголовок новости: {title}</div>
            </Link>
        );
    }
}

export default NewsItem;