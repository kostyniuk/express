'use strict';

const express = require('express');
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null, 'user_' + req.user.username + '.' + file.originalname.split('.')[1]);
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1024 * 1024 * 5},
})


const db = require('../config/db');

const router = express.Router();

const findIdByUserName = async (nickname, res) => {
  const queryUser = `SELECT user_id from user_info WHERE username = $1;`;
  const valuesUser = [nickname];
  let { rows } = await db.query(queryUser, valuesUser);
  if (rows.length === 0) {
    //throw(new Error(`There is no user ${nickname}`));
    res.status(404).json({error: `There is no user ${nickname}`})
  }
  return rows[0].user_id;
};

const personInfoById = async (id, res) => {
  const queryUser = `SELECT * from person WHERE person_id = $1;`;
  const valuesUser = [id];
  let { rows } = await db.query(queryUser, valuesUser);
  let info = rows[0]
  //delete info.person_id;
  return info
};

router.get('/:nickname', async (req, res, next) => {
  try {
    const { nickname } = req.params;
    //console.log({ nickname });
    //console.log(req.session)
    
    const id = await findIdByUserName(nickname, res);
    //console.log({ id });

    const info = await personInfoById(id, res)
    //console.log({info})
    res.json({nickname, info});
  } catch (e) {
    console.error(e);
  }
});

router.get('/:nickname/createPost', (req, res, next) => {
  console.log(req.session, nickname)
  console.log(req.session.username, nickname)
  console.log()
  if (req.session.username === nickname) {
    console.log('username')
    res.json('Create a new Post')
   } else {
    console.log('no username')
     res.status(403).json({e: 'error'})
   }
});

router.post('/:nickname/addPicture', upload.single('profilePhoto'), async (req, res, next) => {
  const { nickname } = req.params;
  const path = process.env.PROFILE_PICTURES_FOLDER + req.file.filename;

  const {rows} = await db.query(`UPDATE person p
    SET picture = $1
    from user_info u
    WHERE p.person_id = u.user_id AND u.username = $2`,
  [path, nickname]);
  
  res.json({src: path});
  
})

module.exports = router;
