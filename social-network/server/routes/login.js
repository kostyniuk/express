'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

// eslint-disable-next-line max-len
router.post('/', passport.authenticate('local', { failureRedirect: '/api/login/failure', successRedirect: '/api/login/success' }));
//try {
// const { username, password } = req.body;
// console.log({username, password})
// const queryUser = `SELECT password from user_info WHERE username = $1;`;
// const valuesUser = [username];
// let { rows } = await db.query(queryUser, valuesUser);
// console.log({ rows });


// if (rows.length === 0) {
//   res.status(404).json('Not Authenthificated');
// }

// const hashedDB = rows[0].password;

// const checkPassword = await bcrypt.compare(password, hashedDB);

// if (checkPassword) {
//   req.session.username = username;
//   res.json('Authenthificated');
// } else {
//   res.json('Not Authenthificated');

//}
// } catch (e) {
//   console.error({ e });
// }
//});

router.get('/failure', (req, res, next) => {
  res.json({ e: 'Authorization failed' });
});

router.get('/success', (req, res, next) => {
  console.log(req.session);
  res.json({ info: 'Authorization successfull', username: req.session.username });
});

module.exports = router;
