let taskController = function (Task) {
    let post = function (req, res) {
        let task = new Task(req.body);
        if (!req.body.title || !req.body.user) {
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
        let paginate = {
            "pagination": {
                "currentPage": 1,
                "currentItems": 33,
                "totalPages": 1,
                "totalItems": 33,
                "_links": {
                    "first": {
                        "page": 1,
                        "href": "http://localhost:8000/api/tasks"
                    },
                    "last": {
                        "page": 1,
                        "href": "http://localhost:8000/api/tasks"
                    },
                    "previous": {
                        "page": 1,
                        "href": "http://localhost:8000/api/tasks"
                    },
                    "next": {
                        "page": 1,
                        "href": "http://localhost:8000/api/tasks"
                    }
                }
            }
        };

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Task.find(query, function (err, tasks) {
            if (err)
                res.status(500).send(err);
            else {
                let collection = {
                    items: tasks,
                    _links: {
                        "self": {
                            "href": "http://localhost:8000/api/tasks"
                        }
                    },
                    pagination: paginate
                };
                res.json(collection);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = taskController;