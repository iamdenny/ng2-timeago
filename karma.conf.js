// Karma configuration
// Generated on Thu Mar 10 2016 08:04:17 GMT+0800 (CST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
        // for Travis
            'node_modules/es6-shim/es6-shim.js',

        // zone-microtask must be included first as it contains a Promise monkey patch
            'node_modules/zone.js/dist/zone-microtask.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/reflect-metadata/Reflect.js',

            { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false, served: true },
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false, served: true },
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false, served: true }, // PhantomJS2 (and possibly others) might require it

            { pattern: 'src/timeago.ts', included: false, watched: true }, // source files
            { pattern: 'tests/**/*.spec.ts', included: false, watched: true }, // test files
            'karma-test-shim.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.ts': ['typescript']
        },

        typescriptPreprocessor: {
            options: require('./tsconfig.json').compilerOptions,
            typings: [
                "typings/main.d.ts"
            ]
        },
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
