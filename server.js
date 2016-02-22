"use strict";
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.send('You found a thing!');
});


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
