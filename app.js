const express = require('express')
require('dotenv').config()
require("./src/db/dbConnection")

const app = express()
const port = process.env.PORT || 5002

app.get("/", (req, res) => {
    res.json({
        message: "Hoş geldiniz."
    })
})

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor...`)
})