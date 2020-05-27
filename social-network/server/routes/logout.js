'use strict';

const express = require('express');

const router = express.Router();

// eslint-disable-next-line max-len
router.get('/', (req, res, next) => {
  req.logout();
  res.json('Logged out');
});

module.exports = router;
