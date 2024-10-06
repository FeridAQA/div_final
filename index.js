const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

// databasa connet
const connectDB = require('./src/database/index')

// post
const { port } = require("./src/config");


app.get('/', (req, res) => {
  res.send('DIV final')
})


connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})