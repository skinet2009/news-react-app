import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import immutableToJS from '../lib/immutableToJS';

class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }

    renderButtons() {
        if (this.props.isAuth) {
            return (
                <div>
                    <Link
                        title={this.props.login}
                        className="app__header-button"
                        to={'/profile'}
                    >
                        <img
                            className="app__header-img"
                            title={this.props.login}
                            src={this.props.avatar}
                            alt=""
                        />
                    </Link>
                </div>
            );
        }

        return <Link className="app__header-button" to={'/login'}>Авторизоваться</Link>;
    }

    render() {
        const buttons = this.renderButtons();

        return (
            <div className="app">
                <header className="app__header">
                    <div className="app__header-title">React + Redux news app</div>
                    {buttons}
                </header>
                <main className="app-blocks">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default immutableToJS(App);
