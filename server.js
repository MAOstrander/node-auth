'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const methodOverride = require('method-override');

const userRoutes = require('./lib/user/routes');
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secretsquirrel';

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded( {extended: false} ) );
app.use(methodOverride('_method'));
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore(),
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  req.session.visits = req.session.visits || {};
  req.session.visits[req.url] = req.session.visits[req.url] || 0;
  req.session.visits[req.url]++;

  console.log(req.session);
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

app.use(userRoutes);

app.get('/', (req, res) => {
  res.render('index');
});


mongoose.connect('mongodb://localhost:27017/node-auth', (err) => {
  if (err) throw err;

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});
