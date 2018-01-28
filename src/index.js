import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './Redux/Store'

import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Provider store={Store}>
        <Router> 
            <App /> 
        </Router>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
