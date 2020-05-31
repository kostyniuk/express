'use strict';

const bcrypt = require('bcryptjs');

const genPassword = async (password, saltNumber) => {

  console.log({password, saltNumber})

  const hash = await bcrypt.hash(password, Number(saltNumber));
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