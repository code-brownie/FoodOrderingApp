const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require('./db');

mongoDB();

const corsOptions = {
  origin: 'https://foodapp-yp71.onrender.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/Displaydata'));
app.use('/api', require('./Routes/OrdersData'));

app.listen(port, () => {
  console.log(`Food app listening on {process.env.REACT_APP_BASE_URL}:${port}`);
});
