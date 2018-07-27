import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import '../node_modules/bulma/css/bulma.css'
import registerServiceWorker from './registerServiceWorker';
import './styles.css'
import configureStore from './store/configureStore'


const store = configureStore();


const jsx = (
  <Provider store={store}>
    <App />
  </Provider>

)
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
