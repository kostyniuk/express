const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};

/*
// "port": 3000,
  // "proxy": {
  //   "^/api": {
  //     "target": "http://localhost:4000",
  //     "ws": true
  //   }
  // },
*/