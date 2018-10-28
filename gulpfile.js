const gulp = require('gulp');
const sass = require('gulp-sass');
// Sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// BrowserSync for autoreload
const browserSync = require('browser-sync');
// Postcss for autoprefixer and other addons
const postCSS = require('gulp-postcss');
const styleguide = require('postcss-style-guide');
const env = require('postcss-preset-env');
const cssnano = require('cssnano');
// Load in paths and Config variables
// const paths = require('./paths');

const postCSSOptions = [
  env({
    stage: 3,
    features: {
      'nesting-rules': true,
    }
  }),
  styleguide({
    project: 'Project name',
    src: './dist/styles/styles.css',
    dest: 'styleguide/index.html', // this is default
    showCode: false,
  }),
  cssnano
];g

// Browser Sync serve task
gulp.task('serve', ['scss'] ,()=>{
  browserSync.init({
        server: "./styleguide"
    })

  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch("./src/*").on('change', browserSync.reload);
})

// Sass Task
gulp.task('scss', () =>
  gulp.src('./src/scss/**/*.scss')
          .pipe(sass())
          .pipe(sourcemaps.init())
          .pipe(postCSS(postCSSOptions))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./dist/styles'))
          .pipe(browserSync.stream())
);

// Default Task
gulp.task('default', ['serve']);
