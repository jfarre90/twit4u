//This index.js bundles the reducers into a rootReducer.

import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

const rootReducer = combineReducers({
    //taking advantage of ES6, we don't need to specify currentUsers: currentUsers.
    currentUser,
    errors,
    messages
});

export default rootReducer;