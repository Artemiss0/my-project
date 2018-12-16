const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('test', function () {
    env({vars:{ENV:'Test'}});
    return gulp.src('tests/*.js', {read:false})
        .pipe(gulpMocha({reporter: 'nyan'}))
        .on('error', function () {
            console.log('error')
    })
});

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});

