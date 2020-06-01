'use strict';
//Ctrl + Shift + I.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const pg = require('pg');
const passport = require('passport');
require('dotenv').config();

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const logoutRoute = require('./routes/logout');
const whoamiRoute = require('./routes/whoami');
const postRoute = require('./routes/post');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.use(cookieParser('12345-67890-09876-54321'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

const pgPool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.use(session({
  // eslint-disable-next-line new-cap
  store: new pgSession({
    pool: pgPool,                // Connection pool
    // eslint-disable-next-line max-len
    tableName: 'session'   // Use another table-name than the default "session" one
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log({ session: req.session });
//   console.log({ user: req.user });
//   next();
// });

app.use('/api/public', express.static('public'));
app.use('/api/whoami', whoamiRoute);
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/post', postRoute);

app.get('/api', (req, res, next) => {
  //console.log(req.session);
  res.status(300);
  res.end('Home');
});

app.listen(4000);
