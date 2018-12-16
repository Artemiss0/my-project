let taskController = function (Task) {
    let post = function (req, res) {
        let task = new Task(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required')
        } else {
            task.save();
            res.status(201);
            res.send(task);
        }
    };
    let get = function (req, res) {
        let query = {}; // creating a JSon filter query

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Task.find(query, function (err, tasks) {
            if (err)
                res.status(500).send(err);
            else
                res.json(tasks);
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = taskController;