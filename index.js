const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req , res) => {
res.send("My first express server is running 2")

})

app.listen(port, () => {

  console.log(`server is running on port ${port}`)
})