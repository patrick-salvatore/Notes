import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.scss';
import App from './App';

import {Provider} from 'react-redux';
import store from './store';
import {fetchMessage} from './Actions/MessageActions';

store.dispatch(fetchMessage());

const app = (
        <Provider store= {store}>
         <BrowserRouter>
          <App/>
         </BrowserRouter>
        </Provider>
)

ReactDOM.render(app,  document.getElementById('root'));