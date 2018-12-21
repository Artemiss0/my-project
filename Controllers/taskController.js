let taskController = function (Task) {
    let post = function (req, res) {
        let task = new Task(req.body);

        task._links.self.href = 'http://' + req.headers.host + '/api/tasks/' + task._id;
        task._links.collection.href = 'http://' + req.headers.host + '/api/tasks/';

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
        const perPage = 10;
        const page = req.params.start || 1;
        const start = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);
        Task.find({})

            .skip((perPage * page) - perPage)
            .limit(limit)
            .exec(function (err, tasks) {
                Task.count().exec(function (err, count) {
                    if (err) return next(err)

                    let maxPage = Math.ceil(count / limit);
                    let paginate = {
                        items: tasks,

                        _links: {self: {href: 'http://' + req.headers.host + '/api/tasks/'}},

                        pagination: {
                            currentPage: page,
                            currentItems: limit || count,
                            totalPages: maxPage,
                            totalItems: count,

                            _links: {
                                first: {
                                    page: 1,
                                    href: 'http://' + req.headers.host + '/api/tasks/?start=1$limit=' + limit
                                },
                                last: {
                                    page: maxPage,
                                    href: 'http://' + req.headers.host + '/api/tasks/?start=' + ((count - limit) + 1) + "&limit=" + limit
                                },
                                previous: {
                                    page: (page - 1),
                                    href: 'http://' + req.headers.host + '/api/tasks/?start=' + (start - limit) + "&limit=" + limit
                                },
                                next: {
                                    page: (page + 1),
                                    href: 'http://' + req.headers.host + '/api/tasks/?start=' + (start + limit) + "&limit=" + limit
                                }
                            }
                        }
                    };
                    res.json(paginate)
                })
            })
    };

    return {
        post: post,
        get: get
    }
};

module.exports = taskController;