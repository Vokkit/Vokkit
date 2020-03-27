import { Vokkit } from '../Vokkit'
import { PluginManifest, PluginManifestProperties } from './PluginManifest'
import { PluginBase } from './PluginBase'
import { Event } from '../event/Event'
import { EventPriority } from '../event/EventPriority'

import path from 'path'
import fs from 'fs'

export class PluginManager {
  static clientPluginManagerPath = path.resolve('src/client/plugin/PluginManager.ts')
  static pluginPath = path.resolve('plugins')
  static pluginExtension = 'zip'
  static pluginList: PluginManifest[]
  static eventListeners: { eventName: string, listener: (event: Event) => any, eventPriority: number }[]

  static loadPlugins () {
    this.pluginList = []
    this.eventListeners = []
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

  private static applyClientPlugin (plugin: PluginManifest) {
    return `${plugin.name}: require('${plugin.path}')`
  }

  static applyClientPlugins () {
    const clientPluginManagerSource = fs.readFileSync(this.clientPluginManagerPath).toString()
    const replaceSource: string[] = []
    this.pluginList.forEach((plugin) => {
      replaceSource.push(this.applyClientPlugin(plugin))
    })
    fs.writeFileSync(this.clientPluginManagerPath, clientPluginManagerSource.replace(/\/\/ {start}((.|\n)*)\/\/ {end}/g, `// {start}\n${replaceSource.join(',\n')}\n// {end}`))
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

  static addEventListener (eventName: string, listener: (event: Event) => any, eventPriority = EventPriority.NORMAL) {
    this.eventListeners.push({ eventName, listener, eventPriority })
  }

  static callEvent (event: Event) {
    const eventName = event.getEventName()
    for (let eventPriority = EventPriority.HIGHEST; eventPriority >= EventPriority.MONITOR; eventPriority--) {
      this.eventListeners.forEach((eventListener) => {
        if (eventListener.eventPriority === eventPriority && eventListener.eventName === eventName) {
          eventListener.listener(event)
        }
      })
    }
    return event
  }
}
