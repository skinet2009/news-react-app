import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import debounce from 'lodash/debounce';

import immutableToJS from '../lib/immutableToJS';

class Login extends Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
        onClearError: PropTypes.func.isRequired,
        error: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
        };
    }

    handleChangeLogin(e) {
        this.setState({ login: e.target.value });
        this.handleClearError();
    }

    handleChangePasssword(e) {
        this.setState({ password: e.target.value });
        this.handleClearError();

    }

    handleSendData() {
        const { login, password } = this.state;

        this.props.onConfirm({ login, password });
    }

    handleClearError = debounce(::this.props.onClearError, 300)

    render() {
        const { error } = this.props;
        const inputClass = `login__body-input ${error ? 'error' : ''}`;

        return (
            <div className="login">
                <div className="login__header">Авторизация</div>
                <div className="login__body">
                    <div className="login__body-input-wrap">
                        <input
                            placeholder="Введите логин..."
                            onChange={::this.handleChangeLogin}
                            className={inputClass}
                            type="text"
                        />
                    </div>
                    <div className="login__body-input-wrap">
                        <input
                            placeholder="Введите пароль..."
                            onChange={::this.handleChangePasssword}
                            className={inputClass}
                            type="password"
                        />
                    </div>
                    <div className="login__body-error">{error}</div>
                </div>
                <div className="login__footer">
                    <Link className="button" to={'/'}>Отмена</Link>
                    <div
                        className="button button_active"
                        onClick={::this.handleSendData}
                    >Авторизоваться</div>
                </div>
            </div>
        );
    }
}

export default immutableToJS(Login);
