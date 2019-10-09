import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

export const signUp = (userdata, history) => dispatch => {
    axios.post('/signup', userdata)
        .then(response => {
            history.push('/login');
        })
        .catch(err => {
            let errors = {};
            if (err.response.data.length > 0) {
                err.response.data.map(error => {
                    errors[error.param] = error.msg;
                });
            }
            else {
                errors = err.response.data;
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}

export const login = userData => dispatch => {
    axios.post('/login', userData)
        .then(result => {
            const { token } = result.data;
            localStorage.setItem('token', token);
            setAuthToken(token);
            const decodedToken = jwt_decode(token);
            dispatch(setCurrentUser(decodedToken));
        })
        .catch(err => {
            let errors = {};
            if (err.response.data.length > 0) {
                err.response.data.map(error => {
                    errors[error.param] = error.msg;
                });
            }
            else {
                errors = err.response.data;
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}

export const googleCurrentUser = () => dispatch => {
    axios.get('/current_user')
        .then(res => {
            dispatch(setCurrentUser(res.data));
        })
        .catch(err => {
            console.log(err);
        })
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logout = () => dispatch => {
    axios.get('/auth/logout')
        .then(res => {
            localStorage.removeItem('token');
            setAuthToken(false);
            dispatch(setCurrentUser({}));
        })
        .catch(err => {
            console.log(err);
        })
}