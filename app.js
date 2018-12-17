let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db;

let Task = require('./Models/taskModel');

if(process.env.ENV === 'Test') {
   db = mongoose.connect('mongodb://localhost/taskAPI_test');
}else {
   db = mongoose.connect('mongodb://localhost/taskAPI');
}
let app = express();

let port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.send(200);
});

taskRouter = require('./Routes/taskRoutes')(Task);

app.use('/api/tasks', taskRouter);

app.get('/', function (req, res, next) {
   res.send('Welcome to my API!! Checker');
});
app.listen(port, function () {
   console.log('Running on PORT: ' + port);
});

module.exports = app;