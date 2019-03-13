import { PluginBase } from './PluginBase'

export class PluginManager {
  static pluginList = {
    // {Replacement}
  }
  static eventListeners: { eventName: string, listener: (event: Event) => any, eventPriority: number }[]

  static loadPlugins () {
    for (const pluginName in this.pluginList) {
      const PluginMainClass = this.pluginList[pluginName]
      const pluginMain = new PluginMainClass()
      if (!(pluginMain instanceof PluginBase)) {
        throw new TypeError()
      }
      pluginMain.onLoad()
    }
  }
}
