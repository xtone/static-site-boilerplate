import del from 'del'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import gulpStylus from 'gulp-stylus'
import gulpPug from 'gulp-pug'
import plumber from 'gulp-plumber'
import browser from 'browser-sync'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

import webpackConfig from './webpack.config'

const bs = browser.create()
const sassCompiler = gulpSass(dartSass);

const clean = () => del('./dest')

const css = () => gulp.src('./src/**/*.css').pipe(gulp.dest('./dest')).pipe(bs.stream({once: true}))

const stylus = () => {
  return gulp.src('./src/**/*.styl')
    .pipe(plumber())
    .pipe(gulpStylus())
    .pipe(gulp.dest('dest'))
    .pipe(bs.stream({once: true}))
}

const sass = () => {
  return gulp.src('./src/**/*.sass')
    .pipe(plumber())
    .pipe(sassCompiler())
    .pipe(gulp.dest('dest'))
    .pipe(bs.stream({once: true}))
}

const html = () => gulp.src('./src/**/*.html').pipe(gulp.dest('./dest')).pipe(bs.stream({once: true}))

const pug = () => {
  return gulp.src(['./src/**/*.pug', '!./src/**/_*.pug'])
    .pipe(plumber())
    .pipe(gulpPug({ pretty: true }))
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream({once: true}))
}

const js = () => gulp.src('./src/**/*.js').pipe(gulp.dest('./dest')).pipe(bs.stream({once: true}))

const es6 = () => {
  return gulp
    .src([
      './src/js/index.js',
    ])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream({once: true}))
}

const images = () =>gulp.src('./src/**/*.{png,jpg,gif,svg,webp}').pipe(gulp.dest('./dest'))

const favicon = () => gulp.src('./src/favicon.ico').pipe(gulp.dest('./dest'))

const server = () => bs.init({ server: { baseDir: './dest', index: 'index.html' } })

const watchFiles = (done) => {
  gulp.watch('./src/**/*.css', css)
  gulp.watch('./src/**/*.styl', stylus)
  gulp.watch('./src/**/*.html', html)
  gulp.watch('./src/**/*.pug', pug)
  gulp.watch('./src/**/*.{png.jpg,gif,svg,webp}', images)
  gulp.watch('./src/**/*.js', es6)
  done()
}

export const build = done => gulp.series(clean, gulp.parallel(css, stylus, sass, html, pug, es6, images))(done)

const devServer = gulp.parallel(server, watchFiles)

export const watch = gulp.series(build, devServer)

export default watch
