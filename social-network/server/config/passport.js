'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');
const {validPassword} = require('../lib/passwordUtils');


// const customFields = {

// }

const verifyCallback = async (username, password, done) => {
  try {
    const {
      rows,
    } = await db.query(`SELECT * FROM user_info WHERE username = $1`, [
      username,
    ]);
    if (rows.length === 0) {
      return done(null, false);
    }

    const hashed = rows[0].password;
    console.log({username})
    const isValid = await validPassword(password, hashed);

    console.log({isValid, username})

    if (isValid) {
      done(null, rows[0]);
    } else {
      return done(null, false);
    }
  } catch (e) {
    console.error(e);
  }
};

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const {
      rows,
    } = await db.query(`SELECT * FROM user_info WHERE user_id = $1`, [
      userId,
    ]);
    if (rows.length !== 0) {
      return done(null, rows[0]);
    }
  } catch(e) {
    console.error(e)
  }
})
