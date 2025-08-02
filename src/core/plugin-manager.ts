import type { DevToolPlugin } from "./types";

class PluginManager {
  private plugins: DevToolPlugin[] = [];

  register(plugin: DevToolPlugin) {
    this.plugins.push(plugin);
  }

  getPlugins() {
    return this.plugins;
  }

  getPluginById(id: string) {
    return this.plugins.find((p) => p.id === id);
  }
}

export const pluginManager = new PluginManager();
