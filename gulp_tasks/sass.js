'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', _sassGulpTask);

return;


/*
 * Private functions follow below.
 **/


// ### Convert SASS to CSS
// not easy to make SASS and autoprefixer play nice together
// while still generating source maps
// https://github.com/sindresorhus/gulp-autoprefixer/issues/8
// read the different solutions in the linked source if this does not work
function _sassGulpTask(cb) {
  gulp.src('./src/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
      errLogToConsole: true,
      // indentedSyntax: true, → Sass Syntax
      outputStyle: 'nested'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpif(['*.css', '!*.map'], autoprefixer()))
    .pipe(gulp.dest('dist/css'))
    .on('end', function () {
      cb();
    });
}
