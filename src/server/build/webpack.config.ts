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
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}

export default config
