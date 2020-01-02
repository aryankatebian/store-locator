const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
