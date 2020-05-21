/* eslint-disable new-cap */
'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/db');

const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.post('/', async (req, res, next) => {
  try {
    const { email, fullName, age, username, password } = req.body;

    const hash = bcrypt.hashSync(password, salt);

    const queryUser = `INSERT INTO user_info (username, password) VALUES ($1, $2) RETURNING user_id;`;
    const valuesUser = [username, hash];
    let { rows } = await db.query(queryUser, valuesUser);

    const id = rows[0].user_id;

    const queryPerson = `INSERT INTO person (person_id, age, fullName, email) VALUES ($1, $2, $3, $4);`;
    const valuesPerson = [id, age, fullName, email];
    const result = await db.query(queryPerson, valuesPerson);

    res.json('Registration is successfull!');
  } catch (e) {
    console.error({ e });
  }
});

module.exports = router;
