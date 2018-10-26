const gulp = require('gulp');
const sass = require('gulp-sass');
// Sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// BrowserSync for autoreload
const browserSync = require('browser-sync');
// Postcss for autoprefixer and other addons
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const styleguide = require('postcss-style-guide');
const cssnano = require('cssnano');
// Load in paths and Config variables
// const paths = require('./paths');

const postCSSOptions = [
  autoprefixer,
  styleguide({
    project: 'Project name',
    src: './dist/css/styles.css',
    dest: 'styleguide/index.html', // this is default
    showCode: false,
  }),
  cssnano
];
// Browser Sync serve task
gulp.task('serve', ['sass'] ,()=>{
  browserSync.init({
        server: "./styleguide"
    })

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch("./src/*").on('change', browserSync.reload);
})

// Sass Task
gulp.task('sass', () =>
  gulp.src('./src/scss/**/*.scss')
          .pipe(sass())
          .pipe(sourcemaps.init())
          .pipe(postCSS(postCSSOptions))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./dist/css'))
          .pipe(browserSync.stream())
);

// Default Task
gulp.task('default', ['serve']);
