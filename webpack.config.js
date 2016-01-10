var path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/todo_react.jsx',
  output: {
    path: path.join(__dirname, 'todosapp', 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  }
};
