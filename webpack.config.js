const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
};