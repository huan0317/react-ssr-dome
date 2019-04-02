// import React from 'react';
// import { render } from 'react-dom';

// function App() {
//     return <div>Hello React</div>
// }

// render(<App/>, document.getElementById('app'));

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './router'
import { Provider } from 'react-redux';
import createStore from './redux/store';

const defaultStore = window.__STORE__ || {} // +
// const store = createStore(); //-
const store = createStore(defaultStore); // +

render(
    <Provider store={store}>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
