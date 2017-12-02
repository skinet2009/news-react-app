export default store => next => action => {
    const globalState = store.getState();

    return next(Object.assign({}, action, { globalState }));
};
