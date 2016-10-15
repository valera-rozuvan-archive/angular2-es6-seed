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

/**
 * Start simple HTTP server.
 */
function _startConnectTask() {
  connect.server({
    root: './dist',
    livereload: true
  });
}

/**
 * Reload the simple HTTP server with contents from `dist` folder.
 */
function _filesDistTask() {
  gulp.src('./dist/**/*')
    .pipe(connect.reload());
}

/**
 * Watch `dist` directory. If something changes, call the task to reload the
 * server.
 */
function _watchDistTask() {
  gulp.watch(['./dist/**/*'], ['files-dist']);
}
