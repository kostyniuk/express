'use strict';

const express = require('express');
const router = express.Router();

router.get('/:postId', (req, res, next) => {
  const { postId } = req.params;
  res.status(200).json({ message: `Received ${postId} post id` });
});

module.exports = router;
