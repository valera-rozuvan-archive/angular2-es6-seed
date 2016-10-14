const gulp = require('gulp');
const watchify = require('watchify');
const babelify = require('babelify');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const mapError = require('./helpers/map_error');

gulp.task('compile-js-once', _compileJsOnceTask);
gulp.task('copy-html-to-dist', _copyHtmlToDist);

gulp.task('dist', ['sass', 'compile-js-once', 'copy-html-to-dist']);

return;

/*
 * Private functions follow below.
 **/

/**
 * Compile JS files once and exit.
 *
 * @param {Function} cb - Callback function
 */
function _compileJsOnceTask(cb) {
  let bundler = watchify(
      browserify('./src/boot.js', {paths: ['./node_modules', './src']}
    )
    .transform(babelify.configure({
      presets: ['es2015'], // Use all of the ES2015 spec.
      plugins: ['transform-decorators-legacy']
    })));

  bundler.bundle()
    .on('error', mapError)
    .pipe(source('frontend.js')) // Pass desired output filename to vinyl-source-stream.
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .on('end', function() {
      bundler.close();
      cb();
    });
}

/**
 * Copy all HTML source files to `dist` folder.
 *
 * @param {Function} cb - Callback function
 */
function _copyHtmlToDist(cb) {
  const base = './src';
  const src = '/**/*.html';
  const trgt = 'dist';

  gulp.src(base + src, {
    base: base
  })
  .pipe(gulp.dest(trgt))
  .on('end', () => {
    cb();
  });
}
