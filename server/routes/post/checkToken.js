const express = require('express')
const router = express.Router()

const decToken = require('../decodeToken')

router.post('/', (req, res) => {
    let result = decToken.decodeToken(req.body.token)
    res.status(200).json(result)
});

module.exports = router;

