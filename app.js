let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI');

let Book = require('./Models/bookModel');

let app = express();

let port = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
// app.use('/api/author', authorRouter);

app.get('/', function (req, res) {
   res.send('Welcome to my API!! Check');
});
app.listen(port, function () {
   console.log('Running on PORT: ' + port);
});