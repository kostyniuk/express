'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const isAvailable = require('../../lib/isOwnPage');
const db = require('../../config/db');

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
  limits: { fileSize: 1024 * 1024 * 5 }, //5 mb
});

router.post(
  '/addPicture',
  isAvailable,
  upload.single('profilePhoto'),
  async (req, res, next) => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }
);

router.delete(
  '/deletePicture',
  isAvailable,
  upload.single('profilePhoto'),
  async (req, res, next) => {
    try {
      const { nickname } = req.params;
      const path = process.env.PROFILE_PICTURES_FOLDER + 'user_default.png';
      const { rows } = await db.query(
        `UPDATE person p
    SET picture = $1
    from user_info u
    WHERE p.person_id = u.user_id AND u.username = $2`,
        [path, nickname]
      );

      res.json({ src: path });
    } catch (e) {
      console.error(e);
    }
  }
);

module.exports = router;
