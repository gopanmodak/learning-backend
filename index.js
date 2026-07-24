const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8000;


app.get('/', (req, res) => {
  res.send('This is my server running')
})

const user = [
  {
    "id": 1,
    "name": "Rahim Ahmed",
    "email": "rahim@gmail.com",
    "town": "Dhaka"
  },
  {
    "id": 2,
    "name": "Karim Hasan",
    "email": "karim@gmail.com",
    "town": "Chattogram"
  },
  {
    "id": 3,
    "name": "Sadia Islam",
    "email": "sadia@gmail.com",
    "town": "Rajshahi"
  },
  {
    "id": 4,
    "name": "Nusrat Jahan",
    "email": "nusrat@gmail.com",
    "town": "Sylhet"
  },
  {
    "id": 5,
    "name": "Tanvir Hossain",
    "email": "tanvir@gmail.com",
    "town": "Khulna"
  },
  {
    "id": 6,
    "name": "Mim Akter",
    "email": "mim@gmail.com",
    "town": "Barishal"
  }
]

app.get('/user', (req, res) => {
  res.send(user)

})

app.post('/user', (req, res) => {
  console.log('User hit this api from client side', req.body)

  const newUser = req.body;
  newUser.id = user.length + 1;
  user.push(newUser)
  res.send(user)
})

app.listen(port,() => {
  console.log(`The server is running port: ${port}`)
})