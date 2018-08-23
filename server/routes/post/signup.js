const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const config = require('../../config')
const hash = require('../hash')

router.post('/', function (req, res) {
    MongoClient.connect(config.url, { useNewUrlParser: true }, function (err, db) {
        assert.equal(null, err);
        let data = req.body
        let dataJson = {
            "email" : data.email,
            "password" : hash.encrypt(data.password),
            "name" : data.name,
            "age" : data.age,
            "role" : "user"
        }
        let dbo = db.db(config.dbName)
        dbo.collection("members").
            insertOne(dataJson, (err, result) => {
                if (err) {
                    res.status(201).json({
                        "status": false,
                        "message": err
                    }).send()
                } else {
                    res.status(201).json({
                        "status": true,
                        "message": result
                    }).send()
                }
            })
        db.close()
    })
});

module.exports = router;