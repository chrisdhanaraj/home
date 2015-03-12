var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

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

gulp.task('styles', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['styles', 'browser-sync'], function() {
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', browserSync.reload({stream: true}));
});

// if I were actually going to build out single assets
// instead of using the CDN stuff

gulp.task('build', function() {
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});
