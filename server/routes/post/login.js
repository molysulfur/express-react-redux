const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const jwt = require('jsonwebtoken')


const hash = require('../hash')
const config = require('../../config')


router.post('/', (req, res) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, db) => {
        assert.equal(null, err);
        let data = req.body
        let email = data.email
        let password = hash.encrypt(data.password)
        let dbo = db.db(config.dbName)
        dbo.collection("members")
            .find({ "email": email, "password": password })
            .toArray((err, result) => {

                assert.equal(null, err);
                if (typeof result[0] != "undefined") {
                    let token = jwt.sign({
                        name: result[0]['name'],
                        email: result[0]['email'],
                        role: result[0]['role']
                    }, '$ukit', { expiresIn: '1d' })
                    res.status(200).json({
                        "status": true,
                        token
                    })
                } else {
                    res.status(200).json({
                        "status": false
                    })
                }

            })
        db.close()
    })
});

module.exports = router;