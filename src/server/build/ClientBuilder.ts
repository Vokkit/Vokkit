import { Vokkit } from '../Vokkit'
import webpackConfig from './webpack.config'

import webpack from 'webpack'
import fs from 'fs'
import path from 'path'

export class ClientBuilder {

  static build () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(path.resolve('src/server/build/webpack.config.js'))) {
        webpackConfig.entry = path.resolve('src/client/Vokkit.ts')
      }
      webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(new Error(stats.toString()))
        }
        resolve()
      })
    })
  }
}
