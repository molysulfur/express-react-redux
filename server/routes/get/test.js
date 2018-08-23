const express = require('express');
const router = express.Router();

const deToken = require('../decodeToken')

router.get('/:token', function (req, res) {
    let data = deToken.decodeToken(req.params.token)
    res.status(200).json(data)
});

module.exports = router;