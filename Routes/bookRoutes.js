let express = require('express');

let routes = function (Book) {
    let bookRouter = express.Router(); // making an instance of a router

    bookRouter.route('/')
        .post(function (req, res) {
            let book = new Book(req.body);

            book.save();
            res.status(201).send(book);
        })
        .get(function (req,res) {
            let query = {}; // creating a JSon filter query

            if (req.query.genre)
            {
                query.genre = req.query.genre;
            }

            Book.find(query, function (err, books) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });
    bookRouter.route('/:bookId')
        .get(function (req,res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        });
    return bookRouter;
};

module.exports = routes;