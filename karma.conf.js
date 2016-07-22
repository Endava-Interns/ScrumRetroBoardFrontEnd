//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: "./app",

    files: [
      "bower_components/angular/angular.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "components/**/*.js"
    ],

    autoWatch: true,

    frameworks: ["jasmine"],

    browsers: ["Chrome", 'Chrome_travis_ci'],

    plugins: [
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-junit-reporter"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    },

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
  });
};
