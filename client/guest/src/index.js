import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Routers from './Routers';


const loggerMiddleware = createLogger();
const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
