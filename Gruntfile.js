module.exports = function(grunt) {

  var thirdparty = '../../../thirdparty/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: true,
        banner: '/*zizzer-zoof Copyright (C) 2012-' + new Date().getFullYear() + ', Roy Lines, http://roylines.co.uk*/\n'
      },
      thirdparty: {
        options: {
          stripBanners: false,
          banner: '/* third-party includes */\n\n'
        },
        src: [
          thirdparty + 'foundation/js/vendor/custom.modernizr.js',
          thirdparty + 'foundation/js/vendor/zepto.js',
          thirdparty + 'foundation/js/foundation/foundation.js',
          thirdparty + 'foundation/js/foundation/foundation.*.js'
        ],
        dest: 'static/js/thirdparties.js'
      },
    },

    uglify: {
      options: {
        banner: '/*zizzer-zoof: Copyright (C) 2012-' + new Date().getFullYear() + ', Roy Lines, http://roylines.co.uk*/\n'
      },
      thirdparty: {
        options: {
          banner: '/* third-party includes */\n\n',
          preserveComments: 'all'
        },
        files: {
          'static/js/thirdparties-min.js': ['static/js/thirdparties.js']
        }
      }
    },

    copy: {
      foundationicons: {
        files: [{
            expand: true,
            src: ['../../../thirdparty/foundation-icons/foundation_icons_general/fonts/*'],
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
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
  });

  // plugins

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // aliases
  grunt.registerTask('thirdparty', ['copy', 'sass', 'concat', 'uglify']);
};
