import {FETCH_MESSAGE, POST_MESSAGE, DELETE_MESSAGE} from '../Actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MESSAGE: 
            return action.message
        case POST_MESSAGE: 
            return [...state, action.payload];
        case DELETE_MESSAGE: 
            return state.filter(e => e._id !== action.id)
        default: 
            return state
    }
}
