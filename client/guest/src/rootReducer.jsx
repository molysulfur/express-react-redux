import { combineReducers } from 'redux';

import { authentication } from './reducers/authReducer';


const rootReducer = combineReducers({
    authentication
});
export default rootReducer;