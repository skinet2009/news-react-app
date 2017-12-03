import { connect } from 'react-redux';

// import { fetchInitData, loadMore, setFilter } from '../actions/App';
import App from '../components/App';

const mapStateToProps = state => ({
    // isLoadInit: state.getIn(['list', 'isLoadInit']),
});
const mapDispatchToProps = {
    // onChangeFilter: setFilter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
