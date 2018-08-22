import { SIGNED_IN } from "../constants";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function signIn(state = initialState, action) {
    switch (action.type) {
        case SIGNED_IN:
            return {
                loggedIn: true,
                user: action.payload
            }
        default:
            return {}
    }
}