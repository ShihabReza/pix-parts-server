const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
const port = process.env.PORT || 5000
app.use(express.json());

app.get('/', (req, res) => {
  res.send('pic-parts-server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})