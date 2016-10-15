// # Karma Test Runner for JavaScript
// https://github.com/karma-runner/karma

module.exports = function(config) {
  config.set({
    // All plugins starting with "karma" will automatically be loaded
    // ```
    // plugins: [
    //   'karma-jasmine',
    //   ...
    // ],
    // ```

    // ## Adapter for the Jasmine testing framework.
    // We will be creating the unit test in jasmine
    // https://github.com/karma-runner/karma-jasmine
    frameworks: ['browserify', 'jasmine'],

    // ## Watch files
    // list of files / patterns to load in the browser
    files: [
      'node_modules/core-js/shim.js',
      'test/**/*.spec.js'
    ],

    proxies: {
      '/index.html': 'http://localhost:8080/index.html',
      '/components/dashboard/dashboard.html': 'http://localhost:8080/components/dashboard/dashboard.html'
    },

    // list of files to exclude
    exclude: [],

    // ## Convert ES6 to ES5
    // as suggested here http://busypeoples.github.io/post/testing-workflow-with-es6/
    preprocessors: {
      'node_modules/core-js/shim.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      paths: ['./node_modules', './src'],
      transform: [
        ['babelify', {
          presets: ['es2015'],
          plugins: ['transform-decorators-legacy']
        }]
      ]
    },

    // reporters: ['progress', 'coverage'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
