let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let taskModel = new Schema({
    title: {type: String},
    user: {type: String},
    body: {type: String},
    importance: {type: String},
    done: {type: String, default: false},
    _links: {
        self: {href: {type: String}},
        collection: {href: {type: String}}
    }
});

module.exports = mongoose.model('Tasks', taskModel);