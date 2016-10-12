'use strict';

const path = require('path');
const gulp = require('gulp');
const minimist = require('minimist');
const Server = require('karma').Server;

let knownOptions = null;
let options = null;

_initiateOptions();
_validateOptions();

gulp.task('test', _testGulpTask);

return;


/*
 * Private functions follow below.
 **/


function _initiateOptions() {
  knownOptions = {
    default: {
      browser: 'PhantomJS',
      once: false
    }
  };

  options = minimist(process.argv.slice(2), knownOptions);
}

function _validateOptions() {
  // --browser option
  //
  // We only want "chrome", or "phantomjs" as values. We don't expect string
  // values to be case sensitive.
  if (typeof options.browser === 'string') {
    let lcBrowserStr = options.browser.toLowerCase();

    switch (lcBrowserStr) {
      case 'chrome':
        options.browser = 'Chrome';
        break;
      case 'phantomjs':
        options.browser = 'PhantomJS';
        break;
      default:
        options.browser = 'PhantomJS';
        break;
    }
  } else {
    options.browser = 'PhantomJS';
  }

  // --once option
  //
  // This option can be supplied without a value - in this case it is evaluated
  // as `true` (boolean value). Also we accept values "true" and "false". We
  // don't expect string values to be case sensitive.
  if (typeof options.once === 'string') {
    let lcOnceStr = options.once.toLowerCase();

    switch (lcOnceStr) {
      case 'true':
        options.once = true;
        break;
      case 'false':
        options.once = false;
        break;
      default:
        options.once = false;
        break;
    }
  } else if (typeof options.once !== 'boolean') {
    options.once = false;
  }
}

function _testGulpTask(cb) {
  const karmaConfig = {
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    browsers: [options.browser],
    singleRun: options.once
  };
  const karmaServerExitF = function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    cb();
  };
  const karmaServer = new Server(karmaConfig, karmaServerExitF);

  console.log('Starting Karma in ' + options.browser + ' browser.');
  if (options.once === true) {
    console.log('Will run tests once and exit Karma.');
  } else {
    console.log('Will run Karma in continuous testing mode.');
  }

  karmaServer.start();
}
