import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";

import Routers from './Routers';
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
