'use strict';
//Ctrl + Shift + I.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const db = require('./db/db');
const signupRoute = require('./routes/signup');


const app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

// (async () => {
//   const {rows} = await db.query(`SELECT * FROM Person;`, []);
//   console.log({rows})
//   return rows
// })().then(res => console.log(res));

app.use('/signup', signupRoute);

app.get('/', (req, res, next) => {
  console.log({ headers: req.headers });
  res.status(300);
  res.end('Home');
});

app.listen(4000);
