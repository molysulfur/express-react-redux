const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.use("/", require("./routes/get/allUser"))
app.use("/api/emailExists", require("./routes/get/emailExists"))
app.use("/api/login", require("./routes/post/login"))
app.use("/api/signup", require("./routes/post/signup"))

app.use("/decode", require("./routes/get/test"))

app.listen(8080,()=>{
    console.log("http://localhost:8080")
})