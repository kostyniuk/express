'use strict';

const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { findIdByUserName, personInfoById } = require('../lib/sqlUtils');
const db = require('../config/db');

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      'user_' + req.user.username + '.' + file.originalname.split('.')[1]
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

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

// posts handling
router.get('/:nickname/post', async (req, res, next) => {
  try {
    const { nickname } = req.params;

    const query = `SELECT post.post_id, post.caption, post.created_at, post.number_of_likes 
    FROM Post
    JOIN user_info ON user_info.user_id = post.creator_id
    WHERE user_info.username = $1
    ORDER BY post.post_id DESC;`;
    const parametrs = [nickname];

    const { rows } = await db.query(query, parametrs);
    res.json(rows);
  } catch (e) {
    console.error(e);
  }
});

const isAvailable = (req, res, next) => {
  const { nickname } = req.params;
  const { username } = req.user;

  if (nickname === username) return next();
  res.status(403).json({ err: `You aren't allowed to be here` });
};

router.post('/:nickname/post', isAvailable, async (req, res, next) => {
  try {
    const { caption } = req.body;

    const { user_id } = req.user;

    const queryInsert = `INSERT INTO post (creator_id, caption) VALUES ($1, $2);`;
    const paramsInsert = [user_id, caption];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts + 1 WHERE person_id = $1;`;
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    res.json({
      message: 'The post was successfully created',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:nickname/post/:id', isAvailable, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const queryInsert = `DELETE FROM post WHERE post_id = $1`;
    const paramsInsert = [id];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts - 1 WHERE person_id = $1;`;
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    res.json({
      message: 'The post was successfully deleted',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

// Profile photos handling

router.post(
  '/:nickname/addPicture',
  isAvailable,
  upload.single('profilePhoto'),
  async (req, res, next) => {
    const { nickname } = req.params;
    console.log(req.file);
    const path = process.env.PROFILE_PICTURES_FOLDER + req.file.filename;

    const { rows } = await db.query(
      `UPDATE person p
    SET picture = $1
    from user_info u
    WHERE p.person_id = u.user_id AND u.username = $2`,
      [path, nickname]
    );

    res.json({ src: path });
  }
);

router.post(
  '/:nickname/deletePicture',
  isAvailable,
  upload.single('profilePhoto'),
  async (req, res, next) => {
    const { nickname } = req.params;
    console.log(req.file);
    const path = process.env.PROFILE_PICTURES_FOLDER + 'user_default.png';

    const { rows } = await db.query(
      `UPDATE person p
    SET picture = $1
    from user_info u
    WHERE p.person_id = u.user_id AND u.username = $2`,
      [path, nickname]
    );

    res.json({ src: path });
  }
);

module.exports = router;
