'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();


const db = require('./db/db');
const users = require('./routes/users');


const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

(async () => {
  const {rows} = await db.query(`SELECT * FROM guestbook;`, []);
  console.log({rows})
})();

app.use('/user', users);

app.get('/', (req, res, next) => {
  console.log({ headers: req.headers });
  res.status(300);
  res.end('Home');
});

app.listen(3000);
