'use strict';

const { formParams } = require('./sqlUtils');
const db = require('../config/db');

module.exports = async (userIds) => {
  let addParameters = formParams(userIds.length);
  const query2 = `SELECT p.person_id, p.picture, u.username
        FROM person p INNER JOIN user_info u on (p.person_id = u.user_id)
        WHERE p.person_id in (${addParameters})`;

  const params2 = userIds;
  const info = await db.query(query2, params2);
  const data = info.rows;
  return data;
};
