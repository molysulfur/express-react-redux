import axios from "axios";
import { userConstants } from "../constants";

function userSignupRequest(userData) {
    const { name, age, email, password } = userData
    return axios.post('http://localhost:8080/api/signup', { name, age, email, password })
        .then(res => (res.data))
        .catch(err => { console.log(err) });
}

function isEmailExists(email) {
    return axios.get(`http://localhost:8080/api/emailExists/${email}`)
        .then(res => (res.data))
        .catch(err => { console.log(err) });
}


function signIn(state) {
    const { email, password } = state
    return dispatch => {
        axios.post('http://localhost:8080/api/login', {
            email,
            password,

        }).then(res => {
            localStorage.setItem('token', res.data['token']);
            dispatch(success(res.data['token']))
        }).catch(error => {
            dispatch(failure(error))
        })
        function success(token) { return { type: userConstants.LOGIN_SUCCESS, token } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}


export const userActions = {
    userSignupRequest,
    isEmailExists,
    signIn
}