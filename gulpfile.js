var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var del = require('del');
var awspublish = require('gulp-awspublish');

var config = require('./config');
var assets = {
  stylus: [ 'src/stylus/*.styl' ],
  js: [ 'src/js/*.js' ]
};

// Stylus
gulp.task('stylus', function () {
  return gulp.src(assets.stylus)
    .pipe(stylus({ compress: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'));
});

// JS
gulp.task('js', function() {
  return gulp.src(assets.js)
    .pipe(gulp.dest('build/js'))
});

// Clean
gulp.task('clean', function (cb) {
  del([
    'build/css/**',
    'build/js/**'
  ], cb);
});

// Build
gulp.task('build', ['clean'], function() {
  gulp.start('stylus', 'js');
});

// Deploy
gulp.task('deploy', function () {
  var publisher = awspublish.create(config.s3);

  // define custom headers
  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('build/**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

// Watch
gulp.task('watch', ['clean', 'build'], function() {
  gulp.watch('src/stylus/**/*.styl', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
});
