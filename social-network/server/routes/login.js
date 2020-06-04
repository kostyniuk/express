'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

// eslint-disable-next-line max-len
router.post('/', passport.authenticate('local', { failureRedirect: '/api/login/failure', successRedirect: '/api/login/success' }));

router.get('/failure', (req, res, next) => {
  res.json({ e: 'Authorization failed' });
});

router.get('/success', (req, res, next) => {
  console.log(req.session);
  res.json({ info: 'Authorization successfull', username: req.session.username });
});

module.exports = router;
