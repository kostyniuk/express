'use strict';
//Ctrl + Shift + I.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const db = require('./db/db');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');


const app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));


app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.get('/', (req, res, next) => {
  console.log({ headers: req.headers });
  res.status(300);
  res.end('Home');
});

app.listen(4000);
