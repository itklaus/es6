const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const notify = require("gulp-notify");
const sass = require('gulp-sass'); 
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('es6', () => {
  return gulp.src('src/js/es6.js')
    .pipe(babel().on("error", notify.onError()))
    .pipe(rename('../dist/js/master.js'))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.stream());
});

gulp.task('pug', () => {
  gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }).on("error", notify.onError()))
  .pipe(gulp.dest('dist/'))
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer(['last 14 versions']))
    .pipe(cleanCSS()) 
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['es6', 'pug', 'sass'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
  gulp.watch('src/**/*.js', ['es6']);
  gulp.watch('src/sass/master.sass', ['sass']);
  gulp.watch("src/*.pug", ['pug']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});