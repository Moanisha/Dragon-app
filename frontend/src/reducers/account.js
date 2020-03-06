import {ACCOUNT} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT = {loggedIn: false}

const accountReducer = (state = DEFAULT_ACCOUNT, action) => {
    switch(action.type) {
        case ACCOUNT.FETCH:
            return {...state, status: fetchStates.fetching};
        case ACCOUNT.FETCH_ERROR:
            return {...state, message: action.message, status: fetchStates.error}
        case ACCOUNT.FETCH_SUCCESS:
            return {...state, ...action.message, status: fetchStates.success, loggedIn: true}
        case ACCOUNT.FETCH_LOGOUT_SUCCESS:
            return {...state, ...action.message, status:fetchStates.success, loggedIn: false}
        default:
            return state
    }
}

export default accountReducer;