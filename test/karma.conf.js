var wiredep = require('wiredep');

module.exports = function (config) {
    var bowerDependencies = wiredep({
        directory: 'bower_components'
    });

    config.set({
        basePath: '../',
        frameworks: ['mocha', 'sinon-chai', 'chai-as-promised'],

        files: bowerDependencies.js.concat([
            'src/**/*.js',
            'test/specHelper.js',
            'test/spec/**/*.js'
        ]),
        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 1337,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        reporters: ['mocha'],
        mochaReporter: {
            output: 'autowatch'

        },
        singleRun: true
    });
};
