import { Vokkit } from '../Vokkit'
import { PluginManifest, PluginManifestProperties } from './PluginManifest'
import { PluginBase } from './PluginBase'

import path from 'path'
import fs from 'fs'

export class PluginManager {
  static clientSource = ``
  static pluginPath = path.resolve('plugins')
  static pluginExtension = 'zip'
  static pluginList: PluginManifest[]

  static loadPlugins () {
    this.pluginList = []
    const pluginList = fs.readdirSync(this.pluginPath)
    pluginList.forEach((pluginfileName) => {
      const pluginDir = path.join(this.pluginPath, pluginfileName)
      if (fs.statSync(pluginDir).isDirectory()) {
        const manifestPath = path.join(pluginDir, 'manifest.json')
        if (!fs.existsSync(manifestPath)) return
        const manifest = JSON.parse(fs.readFileSync(manifestPath).toString())
        if (this.isPluginManifest(manifest)) {
          manifest.path = pluginDir
          this.pluginList.push(manifest)
        }
      } else {
        if (pluginfileName.endsWith(this.pluginExtension)) {
          // TODO (Check and Extract Zip File)
        }
      }
    })
  }

  static applyServerPlugin (plugin: PluginManifest) {
    const PluginMainClass = require(path.join(plugin.path, plugin.server_main))[plugin.name]
    const pluginMain = new PluginMainClass()
    if (!(pluginMain instanceof PluginBase)) {
      throw new TypeError(Vokkit.getServer().getLanguageFormatter().format('server_plugin_main_type_error', { name: plugin.name }))
    }
    pluginMain.onLoad()
  }

  static applyServerPlugins () {
    this.pluginList.forEach((plugin) => {
      this.applyServerPlugin(plugin)
    })
  }

  static applyClientPlugin (plugin: PluginManifest) {
    // TODO: Client의 PluginManager 코드 수정
  }

  static applyClientPlugins () {
    this.pluginList.forEach((plugin) => {
      this.applyClientPlugin(plugin)
    })
  }

  static isPluginManifest (manifest: any): manifest is PluginManifest {
    if (!manifest) return false
    for (const key in PluginManifestProperties.necessary) {
      if (!manifest[key] || typeof manifest[key] !== PluginManifestProperties.necessary[key]) return false
    }
    for (const key in PluginManifestProperties.optional) {
      if (manifest[key] && typeof manifest[key] !== PluginManifestProperties.optional[key]) return false
    }
    return true
  }
}
