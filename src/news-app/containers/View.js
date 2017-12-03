import { connect } from 'react-redux';

import { fetchInitData, loadMore } from '../actions/feed';
import View from '../components/View';

const mapStateToProps = (state, ownProps) => ({
    news: state.getIn(['feed', 'list']).find(item => item.get('id') === parseInt(ownProps.params.id, 10)),
});
const mapDispatchToProps = {
    // fetchInitData,
    // onLoadMore: loadMore,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
