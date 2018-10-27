const gulp = require('gulp');
const sass = require('gulp-sass');
// Sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// BrowserSync for autoreload
const browserSync = require('browser-sync');
// Postcss for autoprefixer and other addons
const postCSS = require('gulp-postcss');
const styleguide = require('postcss-style-guide');
const imports = require('postcss-easy-import');
const env = require('postcss-preset-env');
const cssnano = require('cssnano');
// Load in paths and Config variables
// const paths = require('./paths');

const postCSSOptions = [
  imports,
  env({
    stage: 3,
    features: {
      'nesting-rules': true,
    }
  }),
  styleguide({
    project: 'Project name',
    src: './dist/css/styles.css',
    dest: 'styleguide/index.html', // this is default
    showCode: false,
  }),
  cssnano
];

// Browser Sync serve task
gulp.task('serve', ['css'] ,()=>{
  browserSync.init({
        server: "./styleguide"
    })

  // gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch("./src/*").on('change', browserSync.reload);
})

// CSS Task
gulp.task('css', () =>
  gulp.src('./src/css/*.css')
          .pipe(sourcemaps.init())
          .pipe(postCSS(postCSSOptions))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./dist/css'))
          .pipe(browserSync.stream())
);

// Default Task
gulp.task('default', ['serve']);
