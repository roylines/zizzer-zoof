module.exports = function(grunt) {

  var thirdparty = '../../thirdparty/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    exec: {
      restart: {
        command: 'naught deploy'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*zizzer-zoof: Copyright (C) 2012-' + new Date().getFullYear() + ', Roy Lines, http://roylines.co.uk*/\n'
      },
      angular: {
        src: [
            'angular/head/*.js',
            'angular/services/*.js',
            'angular/directives/*.js',
            'angular/controllers/*.js',
            'angular/tail/*.js'
        ],
        dest: 'static/js/zz.js'
      },
      thirdparty: {
        options: {
          stripBanners: false,
          banner: '/* third-party includes */\n\n'
        },
        src: [
          thirdparty + '/foundation/js/vendor/jquery.js',
          thirdparty + '/foundation/js/vendor/*.js',
          thirdparty + '/foundation/js/foundation/foundation.js',
          //         thirdparty + '/foundation/js/foundation/foundation.*.js',
          thirdparty + '/angular/angular-1.2.2/angular.js',
          thirdparty + '/angular/angular-1.2.2/angular-route.js',
          thirdparty + '/angular/angular-1.2.2/angular-resource.js'
        ],
        dest: 'static/js/thirdparties.js'
      },
    },

    jshint: {
      server: ['app.js', 'models/*.js'],
      grunt: ['Gruntfile.js'],
      angular: ['angular/**/*.js'],
    },

    uglify: {
      options: {
        banner: '/*zizzer-zoof: Copyright (C) 2012-' + new Date().getFullYear() + ', Roy Lines, http://roylines.co.uk*/\n',
        preserveComments: 'some'
      },
      angular: {
        files: {
          'static/js/zz.min.js': ['static/js/zz.js']
        }
      },
      thirdparty: {
        files: {
          'static/js/thirdparties.min.js': ['static/js/thirdparties.js']
        }
      }
    },

    copy: {
      "foundation-icons": {
        files: [{
            expand: true,
            src: [thirdparty + '/foundation-icons/foundation_icons_general/fonts/*'],
            dest: 'static/fonts/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },

    sass: {
      options: {
        style: 'compressed'
      },
      styles: {
        files: {
          'static/css/styles.css': 'sass/styles.scss'
        }
      }
    },

    watch: {
      angular: {
        files: ['angular/*/*.js'],
        tasks: ['angular']
      },
      server: {
        files: ['app.js', 'models/*.js', 'lib/*.js'],
        tasks: ['server']
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt']
      },
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
  });

  // plugins

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  // aliases
  grunt.registerTask('angular', ['concat:angular', 'uglify:angular', 'jshint:angular']);
  grunt.registerTask('server', ['jshint:server', 'exec:restart']);
  grunt.registerTask('thirdparty', ['copy:foundation-icons', 'concat:thirdparty', 'uglify:thirdparty']);
  grunt.registerTask('default', ['sass', 'angular', 'server']);
};
