import axios from "axios";

function userSignupRequest(userData) {
    const { name, age, email, password } = userData
    return axios.post('http://localhost:8080/api/signup', { name, age, email, password })
        .then(res => (res.data))
        .catch(err => { console.log(err) });
}

function isEmailExists(email) {
    return  axios.get(`http://localhost:8080/api/emailExists/${email}`)
        .then(res => (res.data))
        .catch(err => { console.log(err) });
}

export {
    userSignupRequest,
    isEmailExists
}