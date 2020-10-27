const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.use("/", require("./routes/get/allUser"))
app.use("/api/emailExists", require("./routes/get/emailExists"))
app.use("/api/login", require("./routes/post/login"))
app.use("/api/signup", require("./routes/post/signup"))
app.use("/api/checkToken", require("./routes/post/checkToken"))


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})