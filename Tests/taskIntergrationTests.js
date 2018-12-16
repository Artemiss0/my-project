// let should = require('should'),
//     request = require('supertest'),
//     app = require('../app.js'),
//     mongoose = require('mongoose'),
//     Task = mongoose.model('Task',taskAPI),
//     agent = request.agent(app);
//
// describe('Book Crud Test', function () {
//     it('should allow a book to be posted and return a done and _id', function (done) {
//         let taskPost = {
//             title: 'new task',
//             user: 'Nienke',
//             body: 'summary',
//             importance: 'A, B or C',
//         };
//         agent.post('/api/tasks')
//             .send(taskPost)
//             .expect(200)
//             .end(function (err, results) {
//                 results.body.done.should.not.equal(false);
//                 results.body.should.have.property('_id');
//                 done();
//             })
//     });
//     afterEach(function (done) {
//         Task.remove().exec();
//         done();
//     })
// });