import {ACCOUNT_DRAGONS} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_DRAGONS = {dragons: []}

const accountDragonsReducer = (state = DEFAULT_ACCOUNT_DRAGONS, action) => {
    switch(action.type) {
        case ACCOUNT_DRAGONS.FETCH:
            return {...state, status: fetchStates.fetching};
        case ACCOUNT_DRAGONS.FETCH_ERROR:
            return {...state, message: action.message, status: fetchStates.error}
        case ACCOUNT_DRAGONS.FETCH_SUCCESS:
            return {...state, dragons: action.dragons, message: action.message, status: fetchStates.success}
        default:
            return state
    }
}

export default accountDragonsReducer;