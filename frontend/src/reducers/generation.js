import {GENERATION} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_GENERATION = {generationId: '', expiration:''};

const generationReducer = (state = DEFAULT_GENERATION, action) => {
    switch(action.type) {
        case GENERATION.FETCH:
            return {...state, status: fetchStates.fetching};
        case GENERATION.FETCH_ERROR:
            return {...state, message: action.message, status: fetchStates.error}
        case GENERATION.FETCH_SUCCESS:
            return {...state, ...action.generation, status: fetchStates.success}
        default:
            return state
    }
}

export default generationReducer;