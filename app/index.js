import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';
import Store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


const onUpdate = () => window.scrollTo(0, 0);
const routes = (
    <Provider store={Store}>
        <Router history={hashHistory} onUpdate={onUpdate}>{Routes}</Router>
    </Provider>
);

window.onload = () => {
  ReactDOM.render(routes, document.getElementById('app'));
};
