var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src')
var CONTENT_DIR = path.resolve(__dirname, 'dist')

//fix for hot load
process.env.BABEL_ENV = process.env.npm_lifecycle_event

var config = {
  entry: {
    checkout: APP_DIR + '/checkout/app.jsx',
    'sign-up': APP_DIR + '/sign-up/app.jsx',
    vendor: ['react', 'react-dom', 'react-router', 'strong-pass', 'tiny-cookie', 'superagent', 'braintree-web']
  },
  output: {
    path: CONTENT_DIR ,
    publicPath: '/',
    filename: 'bundles/[name].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: APP_DIR
      }
    ]
  },
  devtool: getSourceMapConfig(process.env.npm_lifecycle_event),
  devServer: {
    contentBase: CONTENT_DIR,

    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT || 8080
  },
  plugins: getPlugins(process.env.npm_lifecycle_event)
};

module.exports = config

function getPlugins(command){
  var result = [
    new webpack.optimize.CommonsChunkPlugin("vendor", 'bundles/vendor.js'),
    new CopyWebpackPlugin([
      { from: 'public' }
    ])
  ];
  if(command === 'start'){
    result.push(new webpack.HotModuleReplacementPlugin());
  } else {
    result.push(new CleanWebpackPlugin(['dist']))
    result.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }))
  }
  return result;
}

function getSourceMapConfig(command){
  if(command === 'start'){
    console.log('use devtool = eval')
    return 'eval'
  }
  return 'cheap-module-source-map'
}
