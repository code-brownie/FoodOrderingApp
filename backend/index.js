const express = require('express')
const cors = require("cors");

const app = express()
const port = 5000
const mongoDB = require('./db');
mongoDB();
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
//   next();
// })
app.use(express.json());
app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/Displaydata'));
app.use('/api', require('./Routes/OrdersData'));
app.listen(port, () => {
  console.log(`Food app listening on {process.env.REACT_APP_BASE_URL}:${port}`)
})