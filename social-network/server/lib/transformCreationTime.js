'use strict';

module.exports = (date) => {
  const now = Date.now();
  const diff = now - date.getTime();
  const seconds = diff / 1000;

  if (seconds > 60) {
    const minutes = seconds / 60;
    if (minutes > 60) {
      const hours = minutes / 60;
      if (hours > 24) {
        const days = hours / 24;
        if (days > 7) {
          const weeks = days / 7;
          return { weeks: Math.floor(weeks) };
        }
        return { days: Math.floor(days) };
      }
      return { hours: Math.floor(hours) };
    }
    return { minutes: Math.floor(minutes) };
  }
  return { seconds: Math.floor(seconds) };
};
