import { userConstants } from "../constants/";


let token = localStorage.getItem('token');
const initialState = token ? { "loggedIn": true, "token": token, "errorLogin": false, "errorMsgLogin" : "" } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                "loggedIn": true,
                "errorLogin": false,
                "token": action.token,
                "errorMsgLogin" : ""
            }
        case userConstants.LOGIN_FAILURE:
            return {
                "loggedIn": false,
                "errorLogin": true,
                "errorMsgLogin" : action.error,
                "token": ""
            }
        default:
            return state
    }
}
