const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/server/Vokkit.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/server/')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            babelCore: '@babel/core',
            babelOptions: {
              babelrc: true
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'src/'), ignore: ['*.ts'] }]),
    new CleanWebpackPlugin(['build'])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}
