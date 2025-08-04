import { PLUGIN_ID } from "./constants";
import type { DevToolPlugin } from "../core/types";

let erudaInstance: typeof import("eruda") | null = null;

// TODO: Rename *Plugin to *<version>Plugin
// TODO: Just a TypeScript file instead of put them inside a folder.
export const ErudaPlugin: DevToolPlugin = {
  id: PLUGIN_ID.ERUDA_3,
  name: "Eruda Console",
  onEnable: async () => {
    if (erudaInstance) return;

    const eruda = await import("eruda");
    eruda.default.init();
    erudaInstance = eruda;
  },
  onDisable: () => {
    if (erudaInstance) {
      try {
        erudaInstance.default.destroy();
        // TODO: what about removing Eruda from localStorage?
        erudaInstance = null;
      } catch (err) {
        console.warn("Failed to destroy Eruda:", err);
      }
    }
  },
};
