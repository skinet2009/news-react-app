import { connect } from 'react-redux';

import { fetchInitData, loadMore, changeFilter } from '../actions/feed';
import Feed from '../components/Feed';

const mapStateToProps = state => ({
    isLoad: state.getIn(['feed', 'isLoad']),
    list: state.getIn(['feed', 'list']),
    tags: state.getIn(['feed', 'tags']),
    currentPage: state.getIn(['feed', 'currentPage']),
    countPage: state.getIn(['feed', 'countPage']),
    currentFilter: state.getIn(['feed', 'currentFilter']),
});
const mapDispatchToProps = {
    fetchInitData,
    onLoadMore: loadMore,
    onChangeFilter: changeFilter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
