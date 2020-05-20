/* eslint-disable new-cap */
'use strict';

const express = require('express');
const db = require('../db/db');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log({ req });
  res.send('register route');
});

router.post('/', async (req, res, next) => {
  try {
    const {age, bio, fullname, nickname, password} = req.body;
    console.log({age, bio, fullname, nickname, password})
    const text = `INSERT INTO person (age, bio, fullname) VALUES ($1, $2, $3);`
    const values = [age, bio, fullname]
    const result = await db.query(text, values);
    //const result = await db.query(`SELECT * FROM Person;`)
    console.log({result});
    res.json('Data obtained');
  } catch(e) {
    console.error({ e })
  }
})

module.exports = router;
