const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())




//mongodb using



const uri = "mongodb+srv://gopanhridoy_db_user:ML0QF9zaJnOE2wym@cluster0.xoivzyj.mongodb.net/?appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)

    const database = client.db('userDB')
    const userCollection = database.collection('newUser')


    await client.connect();


    app.get('/list', async (req, res)=> {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.post('/userlist',async (req, res)=> {
      const userList = req.body; 
      console.log('user add database',userList)

      const result = await userCollection.insertOne(userList);
      res.send(result)
    })


    app.delete('/list/:id', async (req, res)=>{
      const id = req.params.id;
      console.log('delete this id: ',id)
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   /*  await client.close(); */
  }
}
run().catch(console.dir);


/* const products = require('./data/products.json')

app.get('/products' , (req, res) => {
  res.send(products)
})

app.post('/products', (req, res) => {

  console.log('user hit the post api' ,req.body)

  const newProducts = req.body;
   newProducts.id = products.length + 1;
   products.push(newProducts);
   res.send(products)
}) */



module.exports = app;



//gopanhridoy_db_user

//ML0QF9zaJnOE2wym