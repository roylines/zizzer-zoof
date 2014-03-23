var css = {},
  gulp = require('gulp'),
  sass = require('gulp-sass');

css.sass = function() {
  return gulp.src('./sass/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
};

module.exports = css;
