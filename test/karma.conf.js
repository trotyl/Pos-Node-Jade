module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'public/bower_components/lodash/dist/lodash.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-animate/angular-animate.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/backend/*.js',
      'public/backend/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};