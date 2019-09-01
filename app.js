/******************************************
Treehouse FSJS Techdegree:
Project 8 - SQL Library Manager
Name: Snir Holland
Date: 01/09/2019
******************************************/

// Requirements
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

// Express activation  
const app = express();

// Pug view engine
app.set('view engine', 'pug');

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Set static content
app.use(express.static('public'));

// Main route
app.get('/', (req,res) => res.redirect('/books'));

// Import book routes
app.use('/books' , require('./routes/books'));

// Error handling
app.use( (req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.render('page-not-found');
});

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));