const _requests = {};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (url, data = {}, method = 'get', canCancelled = true) => {
    let sendData = Object.assign({}, data);

    // @TODO возможно нужен параметр - нужно ли прерывать запрос
    if (_requests[url] && canCancelled) {
        _requests[url].abort();
    }

    const xhr = $[method](url, sendData);

    _requests[url] = Promise.resolve(xhr)
        .then(response => {
            if (response.status !== 'ok') {
                return Promise.reject(response);
            }

            return response.response;
        });

    _requests[url].abort = () => {
        xhr.abort();
    };

    return _requests[url];
};


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const {
        url,
        data,
        method,
        types,
        successCallback,
        errorCallback,
        canCancelled,
    } = callAPI;

    if (typeof url !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = actionData => {
        const finalAction = Object.assign({}, action, actionData);

        delete finalAction[CALL_API];

        return finalAction;
    };
    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));

    return callApi(url, data, method, canCancelled).then(
        response => {
            if (successCallback) {
                successCallback(response);
            }

            return next(actionWith({
                data: response,
                type: successType,
            }));
        },
        error => {
            if (errorCallback) {
                errorCallback(error);
            }

            return next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened',
            }));
        },
    );
};
