import React from 'react';
// createStore creates our store, applyMiddleware applies middleware to our store
import { createStore, applyMiddleware } from 'redux';
// promiseMiddleware checks for promises in our action payloads
import promiseMiddleware from 'redux-promise-middleware';
// must import our reducer so our store can access it
import reducer from './reducer';

// here we export our store created from our reducer and our middlewares
export default createStore(reducer, applyMiddleware(promiseMiddleware()))
