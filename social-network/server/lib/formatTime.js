'use strict';

module.exports = (timeObj) => {
  let unit = Object.keys(timeObj)[0];
  const value = Object.values(timeObj)[0];

  if (value === 1) {
    unit = unit.slice(0, -1);
  }

  return `${value} ${unit} ago`;
};
