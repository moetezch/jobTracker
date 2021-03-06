import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {reducer as formReducer} from 'redux-form'
import jobsReducer from '../reducers/jobsReducer'
import websitesReducer from '../reducers/websitesReducer'
import authReducer from '../reducers/authReducer'
import filtersReducer from '../reducers/filtersReducer'
import bookmarksReducer from '../reducers/bookmarksReducer'
import chartsReducer from '../reducers/chartsReducer'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig,combineReducers({
  jobs: jobsReducer,
  websites:websitesReducer,
  auth: authReducer,
  form:formReducer,
  filters: filtersReducer,
  bookmarks:bookmarksReducer,
  chartsFilter:chartsReducer
}))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
 
  return store;
};
