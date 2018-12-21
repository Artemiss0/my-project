let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db;

let Task = require('./Models/taskModel');

if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/taskAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/taskAPI');
}
let app = express();

let port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.options("/api/tasks", function(req, res, next){
    res.header('Access-Control-Allow-Orgin');
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.set('Accept', 'application/json');
    res.sendStatus(200);
});
app.options("/api/tasks/:taskId", function(req,res,next){
    res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');

    res.set({'Accept': 'application/json'});
    res.sendStatus(200)
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept');
    if (req.accepts('json')) {
        next();
        return
    }
    res.send(400)
});
taskRouter = require('./Routes/taskRoutes')(Task);

app.use('/api/tasks', taskRouter);

app.get('/', function (req, res, next) {
    res.send('Welcome to my API!! Check');
});
app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});

module.exports = app;