'use strict';

const express = require('express');

const { findIdByUserName, personInfoById } = require('../../lib/sqlUtils');

const postRoute = require('./post');
const profilePictureRoute = require('./profilePicture');

const router = express.Router();

// multer config


//users handling
router.get('/:nickname', async (req, res, next) => {
  try {
    const { nickname } = req.params;

    const id = await findIdByUserName(nickname, res);

    const info = await personInfoById(id, res);

    res.json({ nickname, info });
  } catch (e) {
    console.error(e);
  }
});

router.use('/:nickname/post', postRoute);
router.use('/:nickname', profilePictureRoute);

module.exports = router;
