var fs = require('fs');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {

  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ["env", {
              "targets": { node: "6" }, // specify targets here
            }],
            'react',
            'stage-0',
          ],
          plugins: [
            [
              'babel-plugin-webpack-loaders', {
                'config': './webpack.config.babel.js',
                "verbose": false
              }
            ]
          ]
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  externals: [nodeExternals()],
  // plugins: [
  //   new ExternalsPlugin({
  //     type: 'commonjs',
  //     include: path.join(__dirname, './node_modules/'),
  //   }),
  // ],
};
