import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class NewsItem extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        likes: PropTypes.number,
        tags: PropTypes.array,
    }

    render() {
        const { id, title, image, likes, tags } = this.props;

        return (
            <article className="news-feed__news">
                <div className="news-feed__news-image-wrap">
                    <img className="news-feed__news-image" src={image} alt="" />
                </div>
                <Link to={`/news/${id}`}>
                    <div
                        title="Прочитать новость"
                        className="news-feed__news-title"
                    >{title}</div>
                </Link>
                <div className="news-feed__news-footer">
                    <div className="news-feed__news-footer-item">
                        <i className="fa fa-heart-o" />{likes}
                    </div>
                    {tags.map(tag => (
                        <div className="news-feed__news-footer-item news-feed__news-footer-tag">
                            {tag.split(' ').join('').toUpperCase()}
                        </div>
                    ))}
                </div>
            </article>
        );
    }
}

export default NewsItem;