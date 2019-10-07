import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  './components/css/product.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import App from './App';
import * as serviceWorker from './serviceWorker';

import authReducer from './reducers/authReducer';
import shopReducer from './reducers/shopReducer';
import cartReducer from './reducers/cartReducer';
import errorReducer from './reducers/errorReducer';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logout } from './actions/authActions';

const rootReducers = combineReducers({
    auth: authReducer,
    shop:shopReducer,
    cart:cartReducer,
    errors: errorReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

if (localStorage.token) {
    // Set auth token header auth
    setAuthToken(localStorage.token);

    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {


        //logout user
        store.dispatch(logout());

        window.location.href = '/login';
    }
}

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
