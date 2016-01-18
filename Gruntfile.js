'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['sass/*', 'js-src/*'],
        tasks: ['sass', 'browserify', 'uglify', 'cssmin'],
        options: {
          spawn: false
        }
      }
    },
    sass: {                                 // Task
      dist: {                               // Target
        options: {                          // Target options
          style: 'expanded'
        },
        files: {                            // Dictionary of files
          'css/pennapps-styles.css': 'sass/pennapps-styles.scss', // 'destination': 'source'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'js/pennapps-scripts.js': ['js-src/pennapps-scripts.js']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/pennapps-scripts.min.js': 'js/pennapps-scripts.js'
        }
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['browserify', 'sass', 'uglify', 'cssmin']);
}