'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

const { formParams } = require('../lib/sqlUtils');
const fetchEssentInfo = require('../lib/fetchUserEssentialInfo');

router.get('/following', async (req, res, next) => {
  const { user_id } = req.user;

  const query = `SELECT followed_id FROM follow WHERE following_id = $1`;
  const params = [user_id];
  const { rows } = await db.query(query, params);

  if (rows.length) {
    const userIds = rows.map((obj) => Object.values(obj)).flat();

    const data = await fetchEssentInfo(userIds);

    return res.status(200).json({ data });
  }

  return res.status(200).json({ data });
});

router.get('/followers', async (req, res, next) => {
  const { user_id } = req.user;

  const query = `SELECT following_id FROM follow WHERE followed_id = $1`;
  const params = [user_id];
  const { rows } = await db.query(query, params);

  if (rows.length) {
    const userIds = rows.map((obj) => Object.values(obj)).flat();

    const data = await fetchEssentInfo(userIds);

    return res.status(200).json({ data });
  }

  return res.status(200).json({ data });
});

module.exports = router;
