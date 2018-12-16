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

taskRouter = require('./Routes/taskRoutes')(Task);

app.use('/api/tasks', taskRouter);

app.get('/', function (req, res) {
   res.send('Welcome to my API!! Check');
});
app.listen(port, function () {
   console.log('Running on PORT: ' + port);
});

module.exports = app;