import {ACCOUNT} from './types';
import {BACKEND} from '../config';


export const fetchFromAccount = ({
    endpoint, 
    options,
    FETCH_TYPE, 
    SUCCESS_TYPE,
    ERROR_TYPE}) => dispatch => {
    dispatch({type: FETCH_TYPE})
    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`,options)
    .then(response => response.json())
    .then(json => {
        if(json.type === 'error'){
            dispatch({
                type: ERROR_TYPE,
                message: json.message
            })
        } else {
            dispatch({
                type: SUCCESS_TYPE,
                ...json
            });
        }
    })
    .catch(error => dispatch({
        type: ERROR_TYPE,
        message: error.message
    })) 
}

export const signup = ({username, password}) => fetchFromAccount({
    endpoint: 'signup',
    options: {
        method: 'POST',
        body: JSON.stringify({username, password}), //Backend accepts in json format 
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'  //Store session string in the browser
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR
})

export const login = ({username, password}) => fetchFromAccount({
    endpoint: 'login',
    options: {
        method: 'POST',
        body: JSON.stringify({username, password}), //Backend accepts in json format 
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'  //Store session string in the browser
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR
})  

export const logout = () => fetchFromAccount({
    endpoint: 'logout',
    options: {
        credentials: 'include'
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
})

export const fetchAuthenticated =() => fetchFromAccount({
    endpoint: 'authenticated',
    options: {
        credentials: 'include'
    },
    FETCH_TYPE: ACCOUNT.FETCH,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATION_SUCCESS
})