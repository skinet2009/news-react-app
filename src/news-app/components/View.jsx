import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immutableToJS from '../lib/immutableToJS';

class View extends Component {
    static propTypes = {
        news: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div>{this.props.news.id}</div>
        );
    }
}

export default immutableToJS(View);
