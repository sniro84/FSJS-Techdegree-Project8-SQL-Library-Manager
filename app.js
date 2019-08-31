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

// Pug view engine
app.set('view engine', 'pug');

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Set static content
app.use(express.static('public'));

app.get('/', (req,res) => res.redirect('/books'));
app.use('/books' , require('./routes/books'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));