import webpack from 'webpack'
import path from 'path'

const config: webpack.Configuration = {
  entry: path.resolve('src/client/Vokkit.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve('build/client/dist')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$|\.js$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            babelCore: '@babel/core',
            babelOptions: {
              babelrc: true
            },
            silent: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.asc?$/,
        loader: 'assemblyscript-typescript-loader',
        options: {
          limit: 1000,
          name: `[name].[hash:8].wasm`
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}

export default config
