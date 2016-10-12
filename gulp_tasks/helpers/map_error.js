'use strict';

const gutil = require('gulp-util');
const chalk = require('chalk');

module.exports = _mapError;

return;


/*
 * Private functions follow below.
 **/


// Error reporting function.
function _mapError(err) {
  if (err.fileName) {
    // Regular error.
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error.
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}
