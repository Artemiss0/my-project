let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let taskModel = new Schema({
    title: {type:String},
    user: {type:String},
    body: {type:String},
    importance: {type:String},
    done: {type:Boolean, default:false}
});

module.exports = mongoose.model('Tasks', taskModel);