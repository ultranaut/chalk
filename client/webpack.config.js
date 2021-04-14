const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ]
};
