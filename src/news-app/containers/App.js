import { connect } from 'react-redux';

// import { fetchInitData, loadMore, setFilter } from '../actions/App';
import App from '../components/App';

const mapStateToProps = state => ({
    isAuth: state.getIn(['login', 'isAuth']),
    avatar: state.getIn(['login', 'avatar']),
    login: state.getIn(['login', 'login']),
});
const mapDispatchToProps = {
    // onChangeFilter: setFilter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
