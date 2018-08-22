const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient,
    assert = require('assert')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const url = "mongodb://sukit:sukit121@ds125362.mlab.com:25362/guest"


app.get('/api/emailExists/:email', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        assert.equal(null, err)
        let dbo = db.db("guest")
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
})

app.post('/api/login', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        assert.equal(null, err);
        let data = req.body
        let dbo = db.db("guest")
        dbo.collection("members")
            .find({ "email": data.email, "password": data.password })
            .toArray((err, result) => {
                assert.equal(null, err);
                let user = {
                    name: result[0]['name'],
                    email: result[0]['email'],
                    role: result[0]['role']
                }
                res.status(200).json(user)
            })
        db.close()
    })
})


app.post('/api/signup', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        assert.equal(null, err);
        let data = req.body
        data["role"] = "user"
        let dbo = db.db("guest")
        dbo.collection("members").
            insertOne(data, (err, result) => {
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
})

// app.delete('/:name', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err
//         db.collection("members")
//             .deleteOne({ "name": req.params.name }, (err, result) => {
//                 if (err) throw err
//                 db.close()
//             })
//     })
// })

// app.put('/:name/:age', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err
//         db.collection("members")
//             .updateOne({ "name": req.params.name }, { $set: { age: req.params.age } }, (err, result) => {
//                 if (err) throw err
//                 db.close()
//             })
//     })
// })
app.listen(8080)