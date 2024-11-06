const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

// databasa connet
const connectDB = require('./src/database/index')

// port
const { port } = require("./src/config");

//route
const routes=require('./src/routes')


app.get('/', (req, res) => {
  res.send('DIV final')
})

app.use('/api', routes)



connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})