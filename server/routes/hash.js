module.exports.encrypt = (keyword) => {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(keyword).digest('base64');
    return hash
}
