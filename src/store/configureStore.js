import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import *  as reducers from './reducers/reducers';
import { fetchUser } from '../data/fetchedData';
import { addUserAsync, addReposAsync, addCommitsAsync } from './actions/actions';

let reducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(thunk, logger)));

// console.log(store.getState());

// store.dispatch(addUserAsync('PerpetualWar'))
// store.dispatch(addUserAsync('dhh'))
// store.dispatch(addReposAsync('PerpetualWar'))
// store.dispatch(addCommitsAsync('PerpetualWar', 'git-network'))
// store.dispatch(addReposAsync('dhh'))
// store.dispatch(addReposAsync('vue'))







  // const arr = [{
  //   user: 'nesto'
  // },
  // {
  //   user: 'bleh'
  // }];
  
  // let stores = {};
  // arr.map(obj => {
  //   return Object.assign(stores, )
  // });
  // console.log(stores);


