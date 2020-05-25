'use strict';

const bcrypt = require('bcryptjs');

const genPassword = async (password, saltNumber) => {
  const salt = bcrypt.genSaltSync(saltNumber);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const validPassword = async (password, hashed) => {
  const checkPassword = await bcrypt.compare(password, hashed);
  return checkPassword;
}

module.exports = {
  genPassword,
  validPassword
}