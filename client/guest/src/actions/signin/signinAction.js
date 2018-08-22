import { SIGNED_IN } from "../../constants";

export function signIn(payload={}){
    const action = {
        type : SIGNED_IN,
        payload
    }
    return action
}