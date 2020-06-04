'use strict';

const db = require('../config/db');

module.exports = {
  findIdByUserName: async (nickname, res) => {
    const queryUser = `SELECT user_id from user_info WHERE username = $1;`;
    const valuesUser = [nickname];
    let { rows } = await db.query(queryUser, valuesUser);
    if (rows.length === 0) {
      res.status(404).json({ error: `There is no user ${nickname}` });
    }
    return rows[0].user_id;
  },
  
  personInfoById: async (id, res) => {
    const queryUser = `SELECT * from person WHERE person_id = $1;`;
    const valuesUser = [id];
    let { rows } = await db.query(queryUser, valuesUser);
    let info = rows[0];
    return info;
  }
};
