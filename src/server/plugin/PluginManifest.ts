export interface PluginManifest {
  name: string,
  version: string,
  author?: string,
  server_main: string,
  client_main: string,
  path: string
}

export const PluginManifestProperties = {
  necessary: {
    name: 'string',
    version: 'string',
    server_main: 'string',
    client_main: 'string'
  },
  optional: {
    author: 'string'
  }
}
