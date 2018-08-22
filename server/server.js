const express = require('express')
const bodyParser = require('body-parser')
const DB = require('./configDB')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// app.get('/', (req, res) => {
//     DB.MongoClient.connect(DB.url, (err, db) => {
//         if (err) throw err
//         let dbo = db.db("guest")
//         dbo.collection("members")
//             .find({})
//             .toArray((err, result) => {
//                 if (err) throw err
//                 res.json(result)
//                 db.close()
//             })
//     })
// })

app.get('/api/emailExists/:email', (req, res) => {
    DB.MongoClient.connect(DB.url, function (err, db) {
        let dbo = db.db("guest")
        dbo.collection("members")
            .findOne({ "email": req.params.email }, (err, result) => {
                console.log(result)
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

    })
})

app.post('/api/login', (req, res) => {
    DB.MongoClient.connect(DB.url, function (err, db) {
        if (err) throw err
        let data = req.body
        console.log(data)
        let dbo = db.db("guest")
        dbo.collection("members")
            .find({ "email": data.email, "password": data.password })
            .toArray((err, result) => {
                if (err) throw res.json(err)
                let user = {
                    name: result[0]['name'],
                    email: result[0]['email'],
                    role: result[0]['role']
                }
                res.status(200).json(user)
                db.close()
            })
    })
})


app.post('/api/signup', (req, res) => {
    DB.MongoClient.connect(DB.url, function (err, db) {
        if (err) throw err
        let data = req.body
        let dbo = db.db("guest")
        data["role"] = "user"
        dbo.collection("members").
            insertOne(data, (err, result) => {
                if (err){
                    res.status(201).json({
                        "status":false,
                        "message":err
                    }).send()
                }else{
                    res.status(201).json({
                        "status":true,
                        "message":result
                    }).send()
                }
                db.close()
            });
    })
})

app.delete('/:name', (req, res) => {
    DB.MongoClient.connect(DB.url, function (err, db) {
        if (err) throw err
        let dbo = db.db("guest")
        dbo.collection("members")
            .deleteOne({ "name": req.params.name }, (err, result) => {
                if (err) throw err
                db.close()
            })
    })
})

app.put('/:name/:age', (req, res) => {
    DB.MongoClient.connect(DB.url, function (err, db) {
        if (err) throw err
        let dbo = db.db("guest")
        dbo.collection("members")
            .updateOne({ "name": req.params.name }, { $set: { age: req.params.age } }, (err, result) => {
                if (err) throw err
                db.close()
            })
    })
})
app.listen(8080)