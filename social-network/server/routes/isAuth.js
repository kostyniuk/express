'use strict';

const express = require('express');

const db = require('../db/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.signedCookies.username) {
      res.json({
        username: req.signedCookies.username,
        auth: true
      })
    } else {
      res.json({
        username: null,
        auth: false
      })
    }

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
