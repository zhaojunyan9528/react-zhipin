import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import { Button } from 'antd-mobile'
import store from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'  
import './assets/css/index.less'
import './test/socketio_test'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route component={Main} />
            </Switch>
        </HashRouter>
    </Provider >
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
