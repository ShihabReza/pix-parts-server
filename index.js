const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

      const revewCollection = client.db('pix_parts_revew').collection('revew');
      app.get('/revew',async(req, res) => {
            const query = {}
            const cursor = revewCollection.find(query)
            const revew = await cursor.toArray()
            res.send(revew)
      })


      app.get('/product/:id',async(req, res)=>{
        const id = req.params.id
        const query = {_id:ObjectId(id)}
        const product = await productCollection.findOne(query)
        res.send(product)
      })

      app.post('/product',async (req, res) => {
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
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