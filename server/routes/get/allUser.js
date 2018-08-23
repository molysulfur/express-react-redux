const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../../config')

router.get('/', function (req, res) {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, db) => {
        assert.equal(null, err)
        let dbo = db.db(config.dbname)
        dbo.collection("members")
            .find({}).toArray((err, result) => {
                assert.equal(err, null)
                res.status(200).json(result)
            })
        db.close();
    })

});

module.exports = router;