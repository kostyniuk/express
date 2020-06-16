'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/following', async (req, res, next) => {
  const { username, user_id } = req.user;

  const query = `SELECT followed_id FROM follow WHERE following_id = $1`;
  const params = [user_id];
  const {rows} = await db.query(query, params);

  res.json({ user_id, rows});
});

router.get('/followers', async (req, res, next) => {
  const { username, user_id } = req.user;
  res.json({ username, user_id });
});

module.exports = router;
