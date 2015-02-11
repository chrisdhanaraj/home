var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var notifier = require('node-notifier');
var wiredep = require('wiredep').stream;

gulp.task('browser-sync', function() {

  var files = [
    'index.html'
  ];

  browserSync(files, {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('wiredep', function() {

});

gulp.task('styles', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('notify-js', function() {
  browserSync.reload();
});

gulp.task('usemin', function () {
  return gulp.src('./*.html')
    .pipe(usemin({
      js: [ngAnnotate(), uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['styles', 'browser-sync'], function() {
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['notify-js']);
});

gulp.task('build', ['styles', 'usemin']);
