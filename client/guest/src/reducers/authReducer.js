import { userConstants } from "../constants/";


let token = localStorage.getItem('token');
const initialState = token ? { "loggedIn": true, "token": token } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                "loggedIn": true,
                "token": action.token
            }
        case userConstants.LOGIN_FAILURE:
            return state
        default:
            return state
    }
}
