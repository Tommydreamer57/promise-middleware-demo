import React from 'react';
import ReactDOM from 'react-dom';
// Provider is our root-level component
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
// import the store to pass it to the Provider so our app can have access to it
import store from './ducks/store';

ReactDOM.render(
    // Provider wraps our entire app and takes a required 'store' property
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
