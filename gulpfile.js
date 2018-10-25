const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const stylus = require('gulp-stylus');
const compass = require('gulp-compass');
const slim = require('gulp-slim');
const pug = require('gulp-pug');
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

gulp.task('css', () => {
  gulp.src('./src/html/**/*.css')
    .pipe(gulp.dest('./dest/css'))
});

gulp.task('sass', () => {
  gulp.src('./src/css/**/*.sass')
    .pipe(plumber())
    .pipe(compass({
      css: 'dest/css',
      sass: 'src/css'
    })).on('error', (e) => { console.log(e); return true })
    .pipe(browser.reload({ stream: true }));
});

gulp.task('stylus', () => {
  gulp.src('./src/css/**/*.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('dest/css'));
});

gulp.task('html', () => {
  gulp.src('./src/html/**/*.html')
    .pipe(gulp.dest('./dest'))
});

gulp.task('slim', () => {
  gulp.src('./src/html/**/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(gulp.dest('./dest'));
});

gulp.task('pug', () => {
  gulp.src('./src/html/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dest'));
});

gulp.task('js', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dest/js'))
});

gulp.task('es6', () => {
  gulp.src('./src/js/**/*.es6')
    .pipe(babel({ presets: ["env"] }))
    .pipe(gulp.dest('./dest/js'))
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
    ['css', 'sass', 'stylus', 'html', 'slim', 'pug', 'js', 'es6', 'images', 'favicon'],
    callback
  );
});

gulp.task('default', ['server'], () => {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/css/**/*.sass', ['sass']);
  gulp.watch('./src/css/**/*.stylus', ['stylus']);
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/html/**/*.slim', ['slim']);
  gulp.watch('./src/html/**/*.pug', ['pug']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/**/*.es6', ['es6']);    
  gulp.watch('./src/img/**/*', ['images']);
  gulp.watch('./src/favicon.ico', ['favicon']);
});
