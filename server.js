const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const config = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false }

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', config);

app.use(require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`${PORT} is GO!`);
});