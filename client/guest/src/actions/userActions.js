import axios from "axios";
import { userConstants } from "../constants"

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
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:8080/api/login', {
                email,
                password
            })

            if (res.data['status']) {
                let token = res.data['token']
                localStorage.setItem('token', res.data['token'])
                dispatch(SUCCESS(token))
            } else {
                throw new Error("Invalid Email or Password")
            }
        } catch (error){
            dispatch(FAILURE(error.message));
        }
    }
    function SUCCESS(token) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function FAILURE(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function check_token(token) {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:8080/api/checkToken', { token })
            if (res.data.status) {
                dispatch(SUCCESS(token))
            } else {
                throw new Error("Invalid Email or Password")
            }

        } catch (error) {
            dispatch(FAILURE(error.message));
        }
    }
    function SUCCESS(token) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function FAILURE(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}


function logOut() {

    return dispatch => {
        localStorage.removeItem('token')
        dispatch(logOut())
    }
    function logOut() { return { type: userConstants.LOGOUT, } }
}

export const userActions = {
    userSignupRequest,
    isEmailExists,
    signIn,
    logOut,
    check_token
}