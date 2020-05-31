'use strict';

const express = require('express');

const db = require('../config/db');

const router = express.Router();

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log({ username });

    const query = `SELECT post.caption, post.created_at, post.number_of_likes 
    FROM Post
    JOIN user_info ON user_info.user_id = post.creator_id
    WHERE user_info.username = $1
    ORDER BY post.post_id DESC;`;
    const parametrs = [username];

    const { rows } = await db.query(query, parametrs);
    console.log({ posts: rows });
    res.json(rows);
  } catch (e) {
    console.error(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { caption } = req.body;

    const { user_id } = req.user;

    const query = `INSERT INTO post (creator_id, caption) VALUES ($1, $2);`;
    const params = [user_id, caption];

    const { rows } = await db.query(query, params);
    console.log({ rows });

    res.json({
      message: 'The post was successfully created',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
