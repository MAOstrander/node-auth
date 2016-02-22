"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded( {extended: false} ) );


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  console.log("Logged in now?");
  res.redirect('/');
});



app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
