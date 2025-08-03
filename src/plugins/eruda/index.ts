import type { DevToolPlugin } from "../../core/types";
import { PLUGIN_ID } from "../constants";

let erudaInstance: typeof import("eruda") | null = null;

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


        // Remove all Eruda localStorage keys
        Object.keys(localStorage)
          .filter((key) => key.startsWith("eruda-"))
          .forEach((key) => localStorage.removeItem(key));

        erudaInstance = null;
      } catch (err) {
        console.warn("Failed to destroy Eruda:", err);
      }
    }
  },
};
