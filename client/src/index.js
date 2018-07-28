import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import '../node_modules/bulma/css/bulma.css'
import registerServiceWorker from './registerServiceWorker'
import './styles.css'
import configureStore from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore} from 'redux-persist'

const store = configureStore();
let persistor = persistStore(store)


const jsx = (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <App/>
</PersistGate>
  </Provider>

)
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
