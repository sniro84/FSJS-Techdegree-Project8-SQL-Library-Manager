const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');

// Books list
router.get('/', (req,res) => Book.findAll()
    .then(books => {
        res.render('index.pug' , {
            books
        });
    })
    .catch(err => console.log(err)));

// Display new book form
router.get('/new' , (req,res) => {
    res.render('new-book');
})

// Add a new book
router.post('/new', (req,res) => {
    let { title, author, genre, year} = req.body;
    let errors = [];

    // Validations of title and author
    if (!title)
        errors.push({text: 'Please add a title'});
    if (!author)
        errors.push({text: 'Please add an author'});
        
    // Check for errors
    if(errors.length > 0)
    {
        res.render('new-book' , {
            errors,
            title,
            author,
            genre,
            year
        });
    }   
    else
    {
        // Insert book to table
        Book.create({
            title, 
            author, 
            genre, 
            year
        })
            .then( (book) => res.redirect('/books') )
            .catch( (err) => console.log(err) )
    }   
})


module.exports = router;