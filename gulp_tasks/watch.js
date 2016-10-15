const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const watch = require('gulp-watch');
const duration = require('gulp-duration');
const mapError = require('./helpers/map_error');

gulp.task('watch', _watchTask);

return;

/*
 * Private functions follow below.
 **/

/**
 * Create a new bundle.
 *
 * @param {Object} bundler - The watchify bundler object.
 */
function _rebundle(bundler) {
  let rebundleTimer = duration('rebundle time');
  bundler.bundle()
    .on('error', mapError)
    .pipe(source('frontend.js')) // Pass desired output filename to vinyl-source-stream.
    .once('data', rebundleTimer.start)
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rebundleTimer)
    .pipe(gulp.dest('dist/js'))
    .on('end', () => {
      console.log('   ---> done! Watching ...');
    });
}

/**
 * Watch JS files, on change convert ES6 to ES5 and bundle them.
 */
function _compileJs() {
  let bundler = watchify(
      browserify('./src/boot.js', {paths: ['./node_modules', './src']}
    )
    .transform(babelify.configure({
      presets: ['es2015'] // Use all of the ES2015 spec.
    })));

  // Restart the bundling process on file changes.
  bundler.on('update', function() {
    console.log('-> bundling...');
    _rebundle(bundler);
  });

  // Initial rebundle.
  _rebundle(bundler);
}

/**
 * Sync HTML files.
 * http://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
 *
 * @param {string} base - Base path
 * @param {string} src  - Source path
 * @param {string} trgt - Target path
 */
function _sync(base, src, trgt) {
  gulp.src(base + src, {
    base: base
  })
  .pipe(watch(base + src, {
    base: base,
    verbose: true
  }))
  .pipe(gulp.dest(trgt));
}

/**
 * This is the watch task that watches all file changes and runs task so we
 * immediately have the "dist" folder updated.
 *
 * @param {Function} cb - Callback function
 */
function _watchTask(cb) {
  // Watch changes in SASS files and create CSS. Sync CSS to "dist" folder.
  gulp.watch('./src/sass/**/*.sass', ['sass']);

  // Watch changes in HTML template file and sync them to the "dist" folder.
  _sync('./src', '/**/*.html', 'dist');

  // Package JS files into one bundle. Sync the bundle to the "dist" folder.
  _compileJs();
}
