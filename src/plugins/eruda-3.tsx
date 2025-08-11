import eruda from "eruda";

import { PLUGIN_ID } from "./constants";
import DefaultPluginPanel from "../components/default-plugin-panel";
import type { Plugin } from "../types";

let erudaInitialized = false;

const ERUDA_BTN_CLASS = "eruda-entry-btn";

export const Eruda3Plugin: Plugin = {
  id: PLUGIN_ID.ERUDA_3,
  shortName: "ER",
  fullName: "ERUDA",
  description: "ERUDA mobile console",
  onShow: async () => {
    if (erudaInitialized) return;

    eruda.init({
      useShadowDom: false,
      defaults: { displaySize: 80 },
    });
    erudaInitialized = true;

    document.querySelector(`.${ERUDA_BTN_CLASS}`)?.remove();

    eruda.show();
  },
  onHide: () => {
    if (erudaInitialized) {
      try {
        eruda.destroy();
        erudaInitialized = false;
      } catch (err) {
        console.warn("Failed to destroy Eruda:", err);
      }
    }
  },
  renderPanel: (setEnabledPluginsTrigger, onRender) => (
    <DefaultPluginPanel
      onRenderTrigger={onRender}
      setEnabledPluginsTrigger={setEnabledPluginsTrigger}
      title="Eruda"
      description="Eruda mobile console"
      pluginId={PLUGIN_ID.ERUDA_3}
    />
  ),
};
