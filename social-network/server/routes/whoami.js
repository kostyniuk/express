'use strict';

const express = require('express');
const whoamiMiddleware = require('../lib/whoami');

const router = express.Router();

router.get('/', whoamiMiddleware);

module.exports = router;
