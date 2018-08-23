const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../../config')

router.get('/:email', function (req, res) {
	MongoClient.connect(config.url, { useNewUrlParser: true }, (err, db) => {
        assert.equal(null, err)
        let dbo = db.db(config.dbname)
        dbo.collection("members")
            .findOne({ "email": req.params.email }, (err, result) => {
                assert.equal(err, null)
                if (result != null) {
                    res.status(200).json({
                        status: true
                    })
                } else {
                    res.status(200).json({
                        status: false
                    })
                }
            })
        db.close();
    })
});

module.exports = router;