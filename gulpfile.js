var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var minifyCSS = require('gulp-minify-css');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var path = require('path');
var colors = require('colors/safe');


/*
 * Error Handling for watch task so that watch doesn't die
 * when there's an error in the code, but warn instead
 */

function handleError(err) {
  console.log(colors.red('>>>>>>>>>>>>>> Error Detected:\n', err));
  this.emit('end');
}


/*
 * Less preprocessor module for gulp
 */

gulp.task('less', function() {
  return gulp.src('./src/less/main.less')
  .pipe(less().on("error", handleError))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./build/stylesheets'))
});


/*
 * Watcher module for gulp
 */

gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', ['less'])

  var watcher = watchify(browserify({
    entries: ['./src/javascripts/main.react.js'],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
    .pipe(source('build.min.js'))
    .pipe(gulp.dest('./build/javascripts'))
    console.log(colors.green('updated!'))
  })
  .bundle()
  .on('error', handleError)
  .pipe(source('build.min.js'))
  .pipe(gulp.dest('./build/javascripts'))
});

gulp.task('default', ['watch']);
