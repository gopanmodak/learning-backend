const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 9000;

const user = [
  {
    "id": 1,
    "name": "Rahim Ahmed",
    "email": "rahim21@gmail.com",
    "town": "Dhaka"
  },
  {
    "id": 2,
    "name": "Karim Hasan",
    "email": "karim2333@gmail.com",
    "town": "Chattogram"
  },
  {
    "id": 3,
    "name": "Sadia Islam",
    "email": "sadiaislam@gmail.com",
    "town": "Rajshahi"
  },
]

app.get('/', (req,res)=> {
 res.send('This is from your server side')
})


app.get('/users', (req,res) => {
  res.send(user)
})

app.post('/users', (req, res)=> {
  console.log('User API Hit' , req.body)

  const newUser = req.body;
    newUser.id = user.length + 1
    user.push(newUser)
    res.send(user) 
})

app.listen(port, () => {
  console.log(`Your server is runing on port ${port}`)
})