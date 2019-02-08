import del from 'del'
import gulp from 'gulp'
import gulpBabel from 'gulp-babel'
import gulpSass from 'gulp-sass'
import nodeSass from 'node-sass'
import gulpStylus from 'gulp-stylus'
import gulpSlim from 'gulp-slim'
import gulpPug from 'gulp-pug'
import plumber from 'gulp-plumber'
import browser from 'browser-sync'

const bs = browser.create()
gulpSass.compiler = nodeSass

const clean = () => del('./dest')

const css = () => gulp.src('./src/css/**/*.css').pipe(gulp.dest('./dest/css')).pipe(bs.stream({once: true}))

const stylus = () => {
  return gulp.src('./src/css/**/*.stylus')
    .pipe(plumber())
    .pipe(gulpStylus())
    .pipe(gulp.dest('dest/css'))
    .pipe(bs.stream({once: true}))
}

const sass = () => {
  return gulp.src('./src/css/**/*.sass')
    .pipe(plumber())
    .pipe(gulpSass())
    .pipe(gulp.dest('dest/css'))
    .pipe(bs.stream({once: true}))
}

const html = () => gulp.src('./src/html/**/*.html').pipe(gulp.dest('./dest')).pipe(bs.stream({once: true}))

const slim = () => {
  return gulp.src('./src/html/**/*.slim')
    .pipe(plumber())
    .pipe(gulpSlim({ pretty: true }))
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream({once: true}))
}

const pug = () => {
  return gulp.src('./src/html/**/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({ pretty: true }))
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream({once: true}))
}

const js = () => gulp.src('./src/js/**/*.js').pipe(gulp.dest('./dest/js')).pipe(bs.stream({once: true}))

const es6 = () => {
  return gulp.src('./src/js/**/*.es6')
    .pipe(babel({ presets: ["env"] }))
    .pipe(gulp.dest('./dest/js'))
    .pipe(bs.stream({once: true}))
}

const images = () =>gulp.src('./src/img/**/*').pipe(gulp.dest('./dest/img'))

const favicon = () => gulp.src('./src/favicon.ico').pipe(gulp.dest('./dest'))

const server = () => bs.init({ server: { baseDir: './dest', index: 'index.html' } })

const watchFiles = (done) => {
  gulp.watch('./src/css/**/*.css', css)
  gulp.watch('./src/css/**/*.styl', stylus)
  gulp.watch('./src/html/**/*.html', html)
  gulp.watch('./src/html/**/*.pug', pug)
  gulp.watch('./src/js/**/*.js', js)
  gulp.watch('./src/img/**/*', images)
  gulp.watch('./src/favicon.ico', favicon)
  done()
}

export const build = done => gulp.series(clean, gulp.parallel(css, stylus, sass, html, slim, pug, js, images))(done)

export const watch = gulp.series(build, server, watchFiles)

export default watch