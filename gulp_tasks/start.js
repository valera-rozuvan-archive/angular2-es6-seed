'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('start-connect', _startConnectTask);
gulp.task('files-dist', _filesDistTask);
gulp.task('watch-dist', _watchDistTask);

gulp.task('start', ['start-connect', 'watch-dist']);

return;


/*
 * Private functions follow below.
 **/


function _startConnectTask() {
  connect.server({
    root: './dist',
    livereload: true
  });
}

function _filesDistTask() {
  gulp.src('./dist/**/*')
    .pipe(connect.reload());
}

function _watchDistTask() {
  gulp.watch(['./dist/**/*'], ['files-dist']);
}
