'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

const fetchEssentInfo = require('../lib/fetchUserEssentialInfo');

router.get('/following', async (req, res, next) => {
  try {
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
  } catch (e) {
    console.error(e);
  }
});

router.get('/followers', async (req, res, next) => {
  try {
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
  } catch (e) {
    console.error(e);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user_id } = req.user;

    if (user_id !== userId) {
      const query = `INSERT INTO Follow (following_id, followed_id) VALUES ($1, $2);`;
      const params = [user_id, userId];
      const { rows } = await db.query(query, params);
      return res.status(200).json({ rows });
    } 
    return res.status(403).json({ error: `It's forbidden to follow yourself` });
  } catch (e) {
    res.status(404).json({error: e.detail})
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user_id } = req.user;

    if (user_id !== userId) {
      const query = `DELETE FROM Follow WHERE (following_id = $1 AND followed_id = $2);`;
      const params = [user_id, userId];
      const { rows } = await db.query(query, params);
      return res.status(200).json({ rows });
    } 
    return res.status(403).json({ error: `It's forbidden to either follow or unfollow yourself` });
  } catch (e) {
    res.status(404).json({error: e.detail})
  }
});

module.exports = router;
