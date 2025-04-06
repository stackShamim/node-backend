const dotenv = require('dotenv');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./configs/mongodb');
const limiter = require('./configs/api-rate-limit');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const Routes = require('./routes');
const { authenticateRole } = require('./middlewares/auth');

// Routes
app.use('/auth', limiter, Routes.auth);
app.use('/customer', limiter, authenticateRole('customer'), Routes.customer);
app.use('/seller', limiter, authenticateRole('seller'), Routes.seller);
app.use('/distributor', limiter, authenticateRole('distributor'), Routes.distributor);

// Connect to the database
connectMongoDB();

// Routes
// test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
