'use strict';

module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw new Error(
      'To have access to this information, you need to log in first '
    );
  }
};
