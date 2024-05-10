const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the US States API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const statesRouter = require('./routes/states');

app.use('/states', statesRouter);
