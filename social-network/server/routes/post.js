'use strict';

const express = require('express');

const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json([{caption: 'dasdas', date: 'dadas', likes: 3}, {caption: 'Hi', date: '12.03.21', likes: 13}])
})

router.post('/', async (req, res, next) => {
  try {
    const { caption } = req.body;
    
    const { user_id } = req.user;

    const query = `INSERT INTO post (creator_id, caption) VALUES ($1, $2);`
    const params = [user_id, caption];

    const {rows} = await db.query(query, params);
    console.log({rows})

    res.json({ message: 'The post was successfully created', username: req.user.username });
  } catch (e) {
    console.error(e);
  }
});


module.exports = router;
