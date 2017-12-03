import { connect } from 'react-redux';

import { confirm, clearError } from '../actions/login';
import Login from '../components/Login';

const mapStateToProps = state => ({
    isAuth: state.getIn(['login', 'isAuth']),
    error: state.getIn(['login', 'error']),
});
const mapDispatchToProps = {
    onConfirm: confirm,
    onClearError: clearError,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
