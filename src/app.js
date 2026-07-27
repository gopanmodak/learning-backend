const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())

const products = require('./data/products.json')

app.get('/products' , (req, res) => {
  res.send(products)
})

app.post('/products', (req, res) => {

  console.log('user hit the post api' ,req.body)

  const newProducts = req.body;
   newProducts.id = products.length + 1;
   products.push(newProducts);
   res.send(products)
})



module.exports = app;