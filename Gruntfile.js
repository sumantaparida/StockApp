'use strict';
/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
  return require('serve-static')(require('path').resolve(dir));
};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
          src: 'source',
          app: 'app',
          assets: 'app',
          css: ['<%= project.src %>/sass/style.scss'],
          js: ['<%= project.src %>/js/*.js']
        },
        // SASS
        sass: {                              // Task
          dist: {                            // Target
            options: {                       // Target options
              style: 'expanded'
            },
            files: {                         // Dictionary of files
              'app/css/style.css': '<%= project.css %>'
            }
          }
        },
        // CSS MIN
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'app/css/style.min.css': ['app/css/style.css']
                }
            }
        },

        // UGLIFY
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'app/js/app.min.js': ['app/js/app.js']
                }
            }
        },
        // OPEN
        open: {
          server: {
            path: 'http://localhost:<%= connect.options.port %>'
          }
        },
        // WATCH
        watch: {
          options: {livereload: true},
          sass: {
            // We watch and compile sass files as normal but don't live reload here
            files: ['<%= project.src %>/sass/{,*/}*.{scss,sass}'],
            tasks: ['sass', 'cssmin']
          },
          uglify: {
            // We watch and compile sass files as normal but don't live reload here
            files: ['<%= project.app %>/js/{,*/}*.{js,js}'],
            tasks: ['uglify']
          },
          livereload: {
            options: {
              livereload: LIVERELOAD_PORT
            },
            files: [
              '<%= project.app %>/{,*/}*.html',
              '<%= project.app %>/css/*.css',
              '<%= project.app %>/js/{,*/}*.js',
              '<%= project.app %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
          }
        },
        //  Connect
        connect: {
          options: {
            port: 9999,
            hostname: '*'
          },
          livereload: {
            options: {
              middleware: function(connect) {
                return [lrSnippet, mountFolder(connect, 'app')];
              }
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('test', ['sass', 'cssmin', 'uglify']);
    // grunt.registerTask('server', ['express','watch']);
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'connect:livereload', 'open', 'watch']);

};
