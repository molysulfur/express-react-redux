var jwt = require('jsonwebtoken')

module.exports.decodeToken = (token) => {
    try {
        let decoded = jwt.verify(token, '$ukit')
        return {...decoded,"status":true}
    } catch (err) {
        return {...err,"status":false}
    }
}