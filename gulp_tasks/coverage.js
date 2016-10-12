'use strict';

const path = require('path');
const gulp = require('gulp');
const minimist = require('minimist');
const Server = require('karma').Server;

let knownOptions = null;
let options = null;

_initiateOptions();
_validateOptions();

gulp.task('coverage', _coverageGulpTask);

return;


/*
 * Private functions follow below.
 **/


function _initiateOptions() {
  knownOptions = {
    default: {
      browser: 'PhantomJS'
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
}

function _coverageGulpTask(cb) {
  const karmaConfig = {
    configFile: path.join(__dirname, '..', 'karma.conf.js'),
    autoWatch: false,
    browsers: [options.browser],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        'test/**/*.js': 'isparta'
      },
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      reporters: [
          {
              type: 'text-summary',
          },
          {
              type: 'html',
              dir: 'coverage/',
          }
      ]
    },
    preprocessors: {
      'node_modules/core-js/shim.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      paths: ['./node_modules','./src'],
      transform: [
        [
          'babelify',
          {
            presets: ['es2015'],
            plugins: ['transform-decorators-legacy']
          }
        ],
        [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    }
  };
  const karmaServerExitF = function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    cb();
  };
  const karmaServer = new Server(karmaConfig, karmaServerExitF);

  console.log('Will generate coverage report and exit Karma.');

  karmaServer.start();
}
