import webpack from 'webpack-stream'
import path from 'path'
const src = path.join(__dirname, 'src')
const dest = path.join(__dirname, 'dest')

module.exports = {
  mode: 'development',

  entry: path.join(src, 'js/index.js'),

  output: {
    path: path.join(dest, 'js'),
    filename: 'index.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },

  plugins: [
    new webpack.webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js']
  }
}
