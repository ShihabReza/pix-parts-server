const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
const port = process.env.PORT || 5000
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpzy2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const productCollection = client.db('pix_parts').collection('products');
      app.get('/product',async(req, res) => {
            const query = {}
            const cursor = productCollection.find(query)
            const product = await cursor.toArray()
            res.send(product)
      })
    } finally {
     
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('pic-parts-server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})