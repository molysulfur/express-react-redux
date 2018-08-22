import { combineReducers } from 'redux';

import { signIn } from './reducers/authReducer';


const rootReducer = combineReducers({
    signIn
});
export default rootReducer;