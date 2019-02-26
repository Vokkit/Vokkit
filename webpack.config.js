const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

/**
 * Original Code
 * https://github.com/DrewML/webpack-emit-all-plugin/blob/master/index.js
 * 
 * modified by Scripter36
 */
class EmitAllPlugin {
  constructor (opts = {}) {
    this.ignorePattern = opts.ignorePattern || /node_modules/
    this.ignoreExternals = !!opts.ignoreExternals
    this.rootDir = opts.rootDir
    this.outDir = opts.outDir
  }

  shouldIgnore (path) {
    return this.ignorePattern.test(path)
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tapAsync('EmitAllPlugin', ({ modules }, cb) => {
      modules.forEach(mod => {
        if (!mod.resource) return
        const absolutePath = `${mod.resource.substr(0, mod.resource.length - 3)}.js`

        if (this.ignoreExternals && mod.external) return
        if (this.shouldIgnore(absolutePath)) return

        // Used for vendor chunk
        if (mod.constructor.name === 'MultiModule') return

        if (!mod._source) return
        const source = mod._source._value
        const projectRoot = this.rootDir || compiler.context
        const out = this.outDir || compiler.options.output.path

        const dest = path.join(out, absolutePath.replace(projectRoot, ''))

        compiler.outputFileSystem.mkdirp(path.dirname(dest), err => {
          if (err) throw err
          compiler.outputFileSystem.writeFile(dest, source, err => {
            if (err) throw err
          })
        })
      })
      cb()
    })
  }
}


module.exports = {
  entry: path.resolve(__dirname, 'src/server/Vokkit.ts'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/server'),
    libraryTarget: 'commonjs2'
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
    new CleanWebpackPlugin(['build/server']),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'src/server/'), ignore: ['*.ts'] }]),
    new EmitAllPlugin({ rootDir: path.resolve(__dirname, 'src/server'), outDir: path.resolve(__dirname, 'build/server') })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}
