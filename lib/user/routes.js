'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('./model');

require('./local'); // All this will do is execute the local.js file

router.get('/login', (req, res) => {
  res.render('login', {message: res.message});
});

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
);


router.delete('/login', (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err;

    res.redirect('/');
  });
});


router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) throw err;

      if (user) {
        res.redirect('/login');
      } else {
        User.create(req.body, (err) => {
          if (err) throw err;

          res.redirect('/login');
        });
      }
    });
  } else {
    res.render('register', {
      email: req.body.email,
      message: 'Passwords do not match'
    });
  }
});


module.exports = router;
