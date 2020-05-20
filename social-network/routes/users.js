/* eslint-disable new-cap */
'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log({ req });
  res.send('Users route');
});

module.exports = router;
