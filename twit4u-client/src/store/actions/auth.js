import {apiCall, setTokenHeader} from '../../services/api';
import {SET_CURRENT_USER} from '../actionTypes';
import {addError, removeError} from './errors'

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout(){
    //we are using the thunk
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        
    }
}

export function authUser(type, userData){
    return dispatch => {
        //wrap our thunk in a promise so we can wait for the API call
        return new Promise((resolve,reject)=> {
            return apiCall('post', `/api/auth/${type}`, userData).then(({token, ...user})=> {
                /* global localStorage */
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                resolve(); //indicate that the API call succeeded
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject(); //indicate the API call failed
            })
        })
    }
}