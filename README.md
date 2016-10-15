# Angular2 ES6 seed
[![Dependency Status](https://david-dm.org/valera-rozuvan/angular2-es6-seed.svg)](https://david-dm.org/valera-rozuvan/angular2-es6-seed)

A simple seed project to demonstrate bootstrapping of Angular2 using ES6 (The
Sixth Edition of JavaScript, known as ES6 or ECMAScript 2015). The project uses
(among other things):

- [ES6](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf) +
[Babel (v6.x)](https://github.com/babel/babel) +
[Babel Legacy Decorator plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
- [Angular2 (v2.1.0)](https://github.com/angular/angular)
- [Browserify](https://github.com/substack/node-browserify) +
[Babelify](https://github.com/babel/babelify)
- [SASS](http://sass-lang.com/)
- [Karma](https://github.com/karma-runner/karma)
- [Jasmine](https://github.com/jasmine/jasmine)
- [Gulp (v3.9.1)](https://github.com/gulpjs/gulp)
- [ESLint](https://github.com/eslint/eslint) +
[config for Google style](https://github.com/google/eslint-config-google)

## Prerequisites

- Node.js v6.8.0 [https://nodejs.org/en/](https://nodejs.org/en/)

## Initial setup

From the root directory of this project, run the following commands:

```
npm install -g gulp
npm install
```

## Updating when package.json changes

All JavaScript dependencies of the project are specified in the file
`package.json` in the root folder. If this file is updated (new dependency is
added, something is removed, or something is updated), you have to run the
command:

```
npm install
```

to make sure you have all the latest dependencies (the folder `node_modules`
will be updated by this command).

## Running the application

### Build

Initially, you will not have the folder `dist`. This folder will contain the
built web application from the sources. To build the application, you need
to run the command:

```
gulp dist
```

### Simple HTTP server (with LiveReload)

To run a simple HTTP server (that will serve the built static site, contained
in folder `dist`), in a separate console window run:

```
gulp start
```

This simple server will automatically reload the browser if something changes
in the `dist` folder.

### Ease of development

To continuously re-build the project when you change some files, in a separate
console window run:

```
gulp watch
```

If the watcher is running, and you change some code, the project will be
rebuilt, `dist` folder will be updated, and the browser will be automatically
reloaded. This, if you have `watch` and `start` gulp tasks running in parallel,
development of the application becomes a breathe.

### JavaScript unit tests

To run JavaScript unit tests, in a separate console window run:

```
gulp test
```

This command can be further tailored for your needs. Available variations:

```
gulp test --once
gulp test --browser chrome
gulp test --browser phantomjs
gulp test --browser chrome --once
...
```

The order of parameters to `gulp test` does not matter.

### Coverage

To gather coverage status (percent of JavaScript code covered by JS unit tests),
in a separate console window run:

```
gulp coverage
```

Upon completion, this command will output in the console coverage statistics,
and will generate a folder `coverage` with nicely formated HTML coverage report.

### Linting JS code

To run ESLint (will check ES6 JavaScript code), you need to run the following
command:

```
gulp lint
```

## Influences

This seed project was inspired by
[select/Angular2-ES6-Babel-Browserify-Starter](https://github.com/select/Angular2-ES6-Babel-Browserify-Starter)
project. That project is quite old - it uses the beta Angular 2 sources. Also
that project doesn't work out-of-the-box right now.

## Similar projects

- [evanplaice/angular2-es6-seed](https://github.com/evanplaice/angular2-es6-seed)
- [tolyo/ng2-brunch-es6-seed](https://github.com/tolyo/ng2-brunch-es6-seed)
- [willyelm/angular2-es6-seed](https://github.com/willyelm/angular2-es6-seed)

## Useful resources

- [AngularClass/awesome-angular2](https://github.com/AngularClass/awesome-angular2)

## License

This project is licensed under the MIT license. Please [LICENSE](LICENSE) file
for more information.
