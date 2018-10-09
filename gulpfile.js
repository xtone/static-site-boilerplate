const gulp = require('gulp');
const sass = require('gulp-sass');
const compass = require('gulp-compass');
const slim = require('gulp-slim');
const plumber = require('gulp-plumber');
const browser = require('browser-sync');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const path = require('path');

gulp.task('server', () => {
  browser({ server: { baseDir: './dest', index: 'index.html' } });
});

gulp.task('clean', (callback) => {
  rimraf('./dest', callback);
});

gulp.task('sass', () => {
  gulp.src('./src/sass/**/*.sass')
    .pipe(plumber())
    .pipe(compass({
      css: 'dest/css',
      sass: 'src/sass'
    })).on('error', sass.logError)
    .pipe(browser.reload({ stream: true }));
})

gulp.task('slim', () => {
  gulp.src('./src/slim/**/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(gulp.dest('./dest'));
});

gulp.task('images', () => {
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dest/img'))
});

gulp.task('favicon', () => {
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dest'))
});

gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    ['sass', 'slim', 'images', 'favicon'],
    callback
  );
});

gulp.task('default', ['server'], () => {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/slim/**/*.slim', ['slim']);
  gulp.watch('./src/img/**/*', ['images']);
  gulp.watch('./src/favicon.ico', ['favicon']);
});
