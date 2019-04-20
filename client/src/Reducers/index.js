import {combineReducers} from 'redux';
import MessageReducer from './MessageReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    messages: MessageReducer, 
    users: UserReducer
})

export default rootReducer;
