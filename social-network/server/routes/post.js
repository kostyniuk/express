'use strict';

const express = require('express');

const db = require('../config/db');

const router = express.Router();

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log({ username });

    const query = `SELECT post.post_id, post.caption, post.created_at, post.number_of_likes 
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

    const queryInsert = `INSERT INTO post (creator_id, caption) VALUES ($1, $2);`;
    const paramsInsert = [user_id, caption];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts + 1 WHERE person_id = $1;`
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    console.log({ rows, update: result.rows });

    res.json({
      message: 'The post was successfully created',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
