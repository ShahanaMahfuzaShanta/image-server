const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uuwfdq1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const imagesCollection = client.db("image-gallery").collection("images");

    app.get(
        "/images", async (req, res) => {
          const result = await imagesCollection.find().toArray();
          //console.log(result);
          res.send(result);
        }
      );
      
  } finally {
    
  }
}
run().catch((err) => console.error(err));


app.get('/', (req, res) => {
    res.send('Running')
})

app.listen(port, () => {
    console.log(`Running on port, ${port}`)
})