'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

// eslint-disable-next-line max-len
router.post('/', passport.authenticate('local', { failureRedirect: '/api/user/dloading', successRedirect: '/api/user/jimmybutler' }));
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

module.exports = router;
