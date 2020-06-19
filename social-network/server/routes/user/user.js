'use strict';

const express = require('express');

const { findIdByUserName, personInfoById } = require('../../lib/sqlUtils');
const db = require('../../config/db');

const postRoute = require('./post');
const profilePictureRoute = require('./profilePicture');
const isLoggedIn = require('../../lib/isLoggedIn');
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

router.post('/bio', isLoggedIn, async (req, res, next) => {
  try {
    const { bio } = req.body;
    const { user_id } = req.user;

    const query = `UPDATE Person SET bio = $1 WHERE person_id = $2;`;
    const params = [bio, user_id];

    const result = await db.query(query, params);
    console.log({ result });

    res.status(200).json({ message: `Bio updated: '${bio}'` });
  } catch (e) {
    console.error({ e });
  }
});

router.use('/:nickname/post', postRoute);
router.use('/:nickname', profilePictureRoute);

module.exports = router;
