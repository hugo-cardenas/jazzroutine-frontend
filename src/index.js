import App from './render/App';
import pify from 'pify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import createStore from './state/store';
import jsonStorage from 'electron-json-storage';
import { mapStateToProps, mapDispatchToProps, mergeProps } from './map';
import createDummyState from './state/dummyState';

const storage = pify(jsonStorage);

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);

storage.get('state')
    .then(initialState => {
        if (isDev()) {
            initialState = createDummyState(15);
        }
        const store = createStore(initialState);
        // Add exec limit
        store.subscribe(() => {
            storage.set('state', store.getState());
        });

        ReactDOM.render(
            <Provider store={store}>
        <ConnectedApp/>
        </Provider>, document.getElementById('root'));

        // applyDummyColors();
    });



function isDev() {
    return process.env.ELECTRON_ENV === 'development';
}

function applyDummyColors() {
    const randomColor = require('randomcolor');
    Array.from(document.getElementsByTagName('div'))
        .forEach(el => el.style.backgroundColor = randomColor({ luminosity: 'light' }));
}
