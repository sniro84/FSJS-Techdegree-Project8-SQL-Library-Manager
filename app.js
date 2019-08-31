const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database');

// Test database
db.authenticate()
  .then( () => console.log("Database connected...") )
  .catch( () => console.log("Error" + err))

const app = express();

app.get('/', (req,res) => res.send('INDEX'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));