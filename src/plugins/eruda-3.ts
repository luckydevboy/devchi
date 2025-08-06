import eruda from "eruda";

import { PLUGIN_ID } from "./constants";
import type { Plugin } from "../types";

let erudaInitialized = false;

const ERUDA_BTN_CLASS = "eruda-entry-btn";

export const Eruda3Plugin: Plugin = {
  id: PLUGIN_ID.ERUDA_3,
  name: "Eruda Console 3",
  onEnable: async () => {
    if (erudaInitialized) return;

    eruda.init({
      useShadowDom: false,
      defaults: { displaySize: 80 },
    });
    erudaInitialized = true;

    document.querySelector(`.${ERUDA_BTN_CLASS}`)?.remove();

    eruda.show();
  },
  onDisable: () => {
    if (erudaInitialized) {
      try {
        eruda.destroy();
        erudaInitialized = false;
      } catch (err) {
        console.warn("Failed to destroy Eruda:", err);
      }
    }
  },
};
