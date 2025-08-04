import { PLUGIN_ID } from "./constants";
import type { DevToolPlugin } from "../core/types";

let erudaInstance: typeof import("eruda") | null = null;

export const Eruda3Plugin: DevToolPlugin = {
  id: PLUGIN_ID.ERUDA_3,
  name: "Eruda Console 3",
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
