module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './karma-shim.js' }
    ],    
    exclude: [
    ],
    preprocessors: {
      './karma-shim.js': ['webpack']
    },
    webpack: require('./webpack.config')({env: 'test'}),
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}