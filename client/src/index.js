import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import {addJob} from './actions/jobs'
import '../node_modules/bulma/css/bulma.css'
import registerServiceWorker from './registerServiceWorker';
import './styles.css'
import configureStore from './store/configureStore'
import './firebase/firebase'

const store = configureStore();

store.dispatch(addJob({descriptin : "hh",amount :444}))

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>

)
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
