'use strict';

module.exports = (req, res, next) => {
  const { nickname } = req.params;
  const { username } = req.user;

  if (nickname === username) return next();
  res.status(403).json({ err: 'You aren\'t allowed to be here' });
};
