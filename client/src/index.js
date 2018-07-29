import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import '../node_modules/bulma/css/bulma.css'
import registerServiceWorker from './registerServiceWorker'
import './styles.css'
import configureStore from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { firebase } from './firebase/firebase'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'
import { startSetJobs } from './actions/jobs';
const store = configureStore();
let persistor = persistStore(store)


const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>

)
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetJobs()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
