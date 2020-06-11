'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

const { formParams } = require('../lib/sqlUtils');

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log({ postId });
    const query = `SELECT from_id FROM Likes WHERE post_id = $1`;
    const params = [postId];

    let { rows } = await db.query(query, params);

    if (rows.length) {
      const userIds = rows.map((obj) => Object.values(obj)).flat();
      let addParameters = formParams(userIds.length);

      const query2 = `SELECT p.person_id, p.picture, u.username
      FROM person p INNER JOIN user_info u on (p.person_id = u.user_id)
      WHERE p.person_id in (${addParameters})`;
      const params2 = userIds;
      const info = await db.query(query2, params2);
      const data = info.rows;
      res.status(200).json(data);
    } else {
      res.status(200).json(rows);
    }
  } catch (e) {
    console.error(e);
  }
});

router.post('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { user_id } = req.user;

    console.log({ postId, user_id });
    const query = `INSERT INTO Likes (post_id, from_id) VALUES ($1, $2)`;
    const params = [postId, user_id];
    const {rows} = await db.query(query, params)
    console.log({rows})
    res.status(200).json({user_id, postId, rows});
  } catch (e) {
    console.error(e);
    res.status(409).json(e)
  }
});

module.exports = router;
