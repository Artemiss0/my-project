let express = require('express');

let routes = function (Task) {
    let taskRouter = express.Router(); // making an instance of a router
    let taskController = require('../Controllers/taskController.js')(Task);
    taskRouter.route('/')
        .post(taskController.post)
        .get(taskController.get);
    taskRouter.use('/:taskId', function (req, res, next) {
        Task.findById(req.params.taskId, function (err, task) {
            if (err)
                res.status(500).send(err);
            else if (task) {
                req.task = task;
                next();
            } else {
                res.status(404).send('no task found');
            }
        });
    });
    taskRouter.route('/:taskId')
        .get(function (req, res) {
            res.json(req.task);
        })
        .put(function (req, res) {
            Task.findById(req.params.taskId, function (err, task) {
                if (!req.body.title || !req.body.user || !req.body.importance || !req.body.body) {
                    res.status(400).send(err);
                } else {
                    req.task.title = req.body.title;
                    req.task.user = req.body.user;
                    req.task.body = req.body.body;
                    req.task.importance = req.body.importance;
                    req.task.done = req.body.done;
                    req.task.save(function (err) {
                        if (err)
                            res.status(500).send(err);
                        else
                            res.json(req.task);
                    });
                }
            });


        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.bod._id;
            for (let p in req.body) {
                req.task[p] = req.body[p];
            }
            req.task.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.task);
            });
        })
        .delete(function (req, res) {
            req.task.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Removed');
            });
        });
    return taskRouter;
};

module.exports = routes;