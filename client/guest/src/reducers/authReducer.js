import { userConstants } from "../constants/";

let token = localStorage.getItem("token")
const initialState = localStorage.getItem("token") ? { "loggedIn": true, "token": token } : {"loggedIn": false, "token": ""}

export function authentication(state = initialState, action = {}) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                "loggedIn": true,
                "errorLogin": false,
                "token": action.token,
                "errorMsgLogin": "",
                "loggingIn": false
            }
        case userConstants.LOGIN_REQUEST:
            return {
                "errorLogin": false,
                "errorMsgLogin": "",
                "loggingIn": true
            }
        case userConstants.LOGIN_FAILURE:
            return {
                "loggedIn": false,
                "errorLogin": true,
                "errorMsgLogin": action.error,
                "loggingIn": false
            }
        case userConstants.LOGOUT:
            return {
                "loggedIn": false,
                "token": "",
            }
        default:
            return state
    }
}
