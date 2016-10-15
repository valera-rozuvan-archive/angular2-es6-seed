const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('sass-common', _sassCommonGulpTask);
gulp.task('sass-components', _sassComponentsGulpTask);

gulp.task('sass', ['sass-common', 'sass-components']);

return;

/*
 * Private functions follow below.
 **/

/**
 * ### Convert SASS to CSS
 * not easy to make SASS and autoprefixer play nice together
 * while still generating source maps
 * https://github.com/sindresorhus/gulp-autoprefixer/issues/8
 * read the different solutions in the linked source if this does not work
 *
 * @param {string} srcPath - Path where to look for SASS files
 * @param {Function} cb - Callback function
 */
function _sassConverter(srcPath, cb) {
  gulp.src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
      errLogToConsole: true,
      // indentedSyntax: true, → Sass Syntax
      outputStyle: 'nested'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpif(['*.css', '!*.map'], autoprefixer()))
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest('dist/css'))
    .on('end', () => {
      cb();
    });
}

/**
 * Gulp task to convert common SASS files to CSS.
 *
 * @param {Function} cb - Callback function
 */
function _sassCommonGulpTask(cb) {
  _sassConverter('./src/sass/frontend.sass', cb);
}

/**
 * Gulp task to convert component SASS files to CSS.
 *
 * @param {Function} cb - Callback function
 */
function _sassComponentsGulpTask(cb) {
  _sassConverter('./src/components/**/*.sass', cb);
}
