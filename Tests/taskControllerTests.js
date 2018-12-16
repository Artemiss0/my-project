let should = require('should'),
    sinon = require('sinon');

describe('Task Controller Tests: ', function () {
    describe('Post', function () {
        it('should not allow an empty title on post', function () {
            let Task = function (task) {
                this.save = function() {}
            };
            let req = {
                body: {
                    user: 'Nienke'
                }
            };
            let res = {
                status: sinon.spy(),
                send:sinon.spy()
            };
            let taskController = require('../Controllers/taskController')(Task);
            taskController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
});