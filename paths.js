const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '/src')
  dist: path.resolve(__dirname, '/dist'),
  html: path.resolve(__dirname, '/index.html'),
  scss: path.resolve(__dirname, '/src/scss'),
  css: path.resolve(__dirname, '/dist/css'),
  styleguide: path.resolve(__dirname, '/styleguide'),
  theme: {
    scss: path.resolve(__dirname, '/scss'),
    css: path.resolve(__dirname, '/scss'),
  }
}
