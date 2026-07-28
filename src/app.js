//database password
//ML0QF9zaJnOE2wym

const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    await client.connect();


    const database =client.db('learning-backend')
    const userCollection = database.collection('user')
        
    //get methode
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    //get methode find one

    app.get('/users/:id', async (req,res)=>{
      const id =req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.findOne(query);
      res.send(result)
    })

       //post methode
       app.post('/users', async (req, res) => {
        console.log('User try to post : ',req.body)

        const users = req.body;
        const result = await userCollection.insertOne(users);
        res.send(result)
       })

       //delete methode

       app.delete('/users/:id',async(req,res)=>{
          const id =req.params.id;
          const query ={_id: new ObjectId(id)}
          const result = await userCollection.deleteOne(query)
          res.send(result)
       })


       //put methode
       app.put('/users/:id',async (req, res) =>{
        const id =req.params.id;
        const updateUser = req.body;
        console.log(updateUser)

        const filter ={_id: new ObjectId(id)}
        const options = { upsert: true };
  const userUpdate ={
    $set:{
      name :updateUser.name,
    email:updateUser.email,
    town:updateUser.town
    }
    
  }
  const result = await userCollection.updateOne(filter, userUpdate, options);
  res.send(result)
       })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    /* await client.close(); */
  }
}
run().catch(console.dir);




module.exports = app;
