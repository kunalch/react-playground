var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: "dist",
    filename: "bundle.js",
    hash: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
            presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass", "postcss"]
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  
  postcss: function () {
        return [precss, autoprefixer];
  },
  
  plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })
  ],
  devServer: {
    hot: true,
    port: 3000
  }
};
