import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import jobsReducer from '../reducers/jobsReducer'
import {reducer as formReducer} from 'redux-form'
import websitesReducer from '../reducers/websitesReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      jobs: jobsReducer,
      websites:websitesReducer,
      form:formReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
