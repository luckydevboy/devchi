import type { DevToolPlugin } from "../../core/types";
import { PLUGIN_NAMES } from "../constants";

let erudaInstance: typeof import("eruda") | null = null;

export const ErudaPlugin: DevToolPlugin = {
  id: PLUGIN_NAMES.ERUDA_3,
  name: "Eruda Console",
  enabledByDefault: false,
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
        erudaInstance = null;
      } catch (err) {
        console.warn("Failed to destroy Eruda:", err);
      }
    }
  },
};
