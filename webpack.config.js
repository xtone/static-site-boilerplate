import path from 'path'
const dest = path.join(__dirname, 'dest')

module.exports = {
  mode: 'development',

  output: {
    path: path.join(dest, 'js'),
    filename: 'index.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              // プリセットを指定することで、ES5 に変換
              "@babel/preset-env",
            ],
          },
        }],
      },
    ],
  },
}
