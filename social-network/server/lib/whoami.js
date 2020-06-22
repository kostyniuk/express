'use strict';

module.exports = (req, res, next) => {

  if (req.user) {
    return res.json({ authentificated: true, user: req.user.username, id: req.user.user_id });
  }
  res.json({ authentificated: false, user: null });
}