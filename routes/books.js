const express = require('express');
const router = express.Router();
// const db = require('../config/database');
const Book = require('../models/Book');

// Books list
router.get('/', (req,res) => Book.findAll()
    .then( (books) => {
        res.render('index' , {
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
        errors.push({text: 'Please add a Title'});
    if (!author)
        errors.push({text: 'Please add an Author'});
        
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

// Display update book form
router.get('/:id' , (req,res) => Book.findAll()
        .then( (books) => {   
            let foundID = false;
            books.forEach( (book) => {
                if (book.id == req.params.id)
                {
                    foundID = true;
                    chosenBook = book;
                }
                    
            });
            if (foundID)
                res.render('update-book' , {chosenBook}); 
            else
                res.render('page-not-found');    
        })
        .catch((err) => console.log(err))
)

// Update book
router.post('/:id', (req,res) => {
    let { title, author, genre, year} = req.body;
    let errors = [];

    // Validations of title and author
    if (!title)
        errors.push({text: 'Please add a Title'});
    if (!author)
        errors.push({text: 'Please add an Author'});

    // Check for errors
    if(errors.length > 0)
    {
        res.render('update-book' , {
            errors,
            title,
            author,
            genre,
            year
        });
    }   
    else
    {
        Book.findByPk(req.params.id)
            .then( (book) => book.update(req.body))
            .then( () => res.redirect('/'))
            .catch( (err) => console.log(err) )
    }
})

// Delete book
router.post('/:id/delete' , (req,res) => {
    Book.findByPk(req.params.id)
            .then( (book) => book.destroy())
            .then( () => res.redirect('/'))
            .catch( (err) => console.log(err) );
})

module.exports = router;