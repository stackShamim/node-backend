const dotenv = require('dotenv');
require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectMongoDB = require('./configs/mongodb.config');
const limiter = require('./configs/api-rate-limit.config');
const errorHandler = require('./middlewares/errorHandler.middleware');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

const Routes = require('./routes');
const { authenticateRole } = require('./middlewares/auth.middleware');

// Routes
app.use('/auth', limiter, Routes.auth);
// app.use('/public', limiter, Routes.public);
// app.use('/customer', limiter, authenticateRole('customer'), Routes.customer);
// app.use('/seller', limiter, authenticateRole('seller'), Routes.seller);
app.use('/seller', limiter, Routes.seller);
// app.use('/distributor', limiter, authenticateRole('distributor'), Routes.distributor);

app.use('/test',  Routes.test);

// Global error handler
app.use(errorHandler)

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
