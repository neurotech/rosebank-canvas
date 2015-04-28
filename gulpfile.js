var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var del = require('del');
var awspublish = require('gulp-awspublish');

var config = require('./config');
var assets = {
  stylus: [ 'src/stylus/*.styl' ],
  js: [ 'src/js/*.js' ],
  svg: [ 'src/svg/*.svg']
};

// Stylus
gulp.task('stylus', function() {
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

// SVG
gulp.task('svg', function() {
  return gulp.src(assets.svg)
    .pipe(gulp.dest('build/svg'))
});

// Clean
gulp.task('clean', function(cb) {
  del([
    'build/css/**',
    'build/js/**',
    'build/svg/**'
  ], cb);
});

// Deploy
gulp.task('deploy', ['build'], function() {
  gulp.start('s3');
});

// s3
gulp.task('s3', function() {
  var publisher = awspublish.create(config.s3);
  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('build/**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

// Build
gulp.task('build', function() {
  gulp.start('stylus', 'js', 'svg');
});

// Watch
gulp.task('watch', ['clean', 'build'], function() {
  gulp.watch('src/stylus/**/*.styl', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/svg/**/*.svg', ['svg']);
});
