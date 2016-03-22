'use strict';

module.exports = function(grunt) {
    grunt.config.init({
        watch:{
            files: ['gruntfile.js', './src/**/*.js', 'test/**/*.js'],
            tasks: ['eslint', 'mochaTest']
        },
        eslint: {
          src: ['.']
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'list'
            },
            src: ['test/**/*.js']
          }
        }
      });
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-compass');
      grunt.loadNpmTasks('gruntify-eslint');
      grunt.loadNpmTasks('grunt-mocha-test');
    };
