import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../media/logo.svg';
import '../media/App.css';

class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
