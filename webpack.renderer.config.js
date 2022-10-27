const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

module.exports = {
  module: { rules },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      fs: require.resolve('browserify-fs'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url')
    }
  }
}
