import { userConstants } from "../constants/";


const initialState = []

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
                "loggingIn": true
            }
        case userConstants.LOGIN_FAILURE:
            return {
                "loggedIn": false,
                "errorLogin": true,
                "errorMsgLogin": action.error,
                "token": "",
                "loggingIn": false
            }
        case userConstants.LOGOUT:
            return initialState
        default:
            return state
    }
}
