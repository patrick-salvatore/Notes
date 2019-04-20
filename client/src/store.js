import {createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './Reducers';

const intialState = {
    messages: []
}

const middleware = [thunk]

const store = createStore(
    rootReducer, 
    intialState, 
    compose(
        applyMiddleware(...middleware), 
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export default store;