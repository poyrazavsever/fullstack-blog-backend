const express = require('express')
require('dotenv').config()
require("./src/db/dbConnection")
const router = require('./src/routers/index');

const app = express()
const port = process.env.PORT || 5002

// Middlewares
app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended:true, parameterLimit:50000}))

app.use("/api", router)

app.get("/", (req, res) => {
    res.json({
        message: "Hoş geldiniz."
    })
})

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor...`)
})