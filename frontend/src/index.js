import React from 'react';
import { render } from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import Root from './components/Root'
import thunk from 'redux-thunk';
import {fetchAuthenticated} from './actions/account';
import rootReducer  from './reducers';
import { Provider } from 'react-redux';
import './index.css';

// const DEFAULT_GENERATION = {generationId: '', expiration:''};
// const GENERATION_ACTION_TYPE = 'GENERATION_ACTION_TYPE'


/** 3) Create reducer which returns an object and pass it to store
       Check the type of action dispatched and return the object which we can get in the store.getState() method**/



// const generationReducer = (state, action) => {
//     console.log("generation reducer state", state);
//     console.log("generation reducer action", action);
//     if(action.type === GENERATION_ACTION_TYPE){
//         return {generation: action.generation}
//     }
//     return {
//         generation: DEFAULT_GENERATION
//     };
// }




// 1)Create store
const store = createStore(rootReducer, applyMiddleware(thunk));  

// store.subscribe(() => console.log("Updated store state", store.getState()));

/** 2) store.dispatch(action) Sends this action to each of the redux reducers 
      and its upto the reducers to respond to that action **/

// store.dispatch({type:'goo'}) ;
// store.dispatch({
//     type: GENERATION_ACTION_TYPE,
//     generation: {generationId: 'goo', expiration:'foo'}
// })

// const generationActionCreator = (payload) => {
//     return {
//         type: GENERATION_ACTION_TYPE,
//         generation: payload
//     }
// }

// store.dispatch(generationActionCreator({generationId: 'zoo', expiration:'2021'}))

// fetch('http://localhost:3000/generation')
// .then(response => response.json())
// .then(json => {
//     store.dispatch(generationActionCreator(json.generation))
// })
store.dispatch(fetchAuthenticated())
.then(()=>{
    render(
        <Provider store={store}>
           <Root/>
        </Provider>,
        document.getElementById('root')
    );
})
