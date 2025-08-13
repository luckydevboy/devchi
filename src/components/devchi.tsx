import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import DevchiPanel from "./devchi-panel";
import RootStyles from "./root-styles";
import SpeedDial from "./speed-dial";
import { PLUGIN_ID } from "../plugins/constants";
import type { PluginId } from "../plugins/types";
import type { Plugin } from "../types";

const mapPluginNameToPlugin: Record<PLUGIN_ID, () => Promise<Plugin>> = {
  [PLUGIN_ID.ERUDA_3]: async () =>
    await import("../plugins/eruda-3").then((res) => res.Eruda3Plugin),
  [PLUGIN_ID.REACT_QUERY_Devtools_5]: async () =>
    await import("../plugins/react-query-devtools-5").then((res) =>
      res.createReactQueryDevtools5Plugin()
    ),
};

const DEVCHI_PANEL_ID = "devchi";
export const ENABLED_PLUGIN_IDS_KEY = "devchi-enabled-plugin-ids";

interface IProps {
  pluginIds: PluginId[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactQueryClient?: any;
}

export default function Devchi(props: IProps) {
  const { pluginIds, reactQueryClient } = props;

  const [registeredPlugins, setRegisteredPlugins] = useState<Plugin[]>([]);
  const [enabledPluginIds, setEnabledPluginIds] = useState<PluginId[]>(() => {
    try {
      const saved = localStorage.getItem(ENABLED_PLUGIN_IDS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error("Failed to parse saved enabled plugins", err);
    }
    return [];
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      ENABLED_PLUGIN_IDS_KEY,
      JSON.stringify(enabledPluginIds)
    );
  }, [enabledPluginIds]);

  useEffect(() => {
    const loadPlugins = async () => {
      const loaded = await Promise.all(
        pluginIds.map(async (id) => {
          const loadPlugin = mapPluginNameToPlugin[id];
          const plugin = await loadPlugin();
          return plugin;
        })
      );
      setRegisteredPlugins(loaded);
    };

    loadPlugins();
  }, [pluginIds]);

  let container = document.getElementById(DEVCHI_PANEL_ID);

  if (!container) {
    container = document.createElement("div");
    container.id = DEVCHI_PANEL_ID;
    document.documentElement.insertBefore(container, document.body);
  }

  function renderEnabledPlugins() {
    return enabledPluginIds.map((pluginId) => {
      const plugin = registeredPlugins.find((p) => p.id === pluginId);
      if (plugin?.render) {
        const input =
          plugin.id === PLUGIN_ID.REACT_QUERY_Devtools_5
            ? reactQueryClient
            : undefined;

        return plugin.render(input);
      }
    });
  }

  return createPortal(
    <RootStyles>
      <DevchiPanel
        isPanelOpen={isPanelOpen}
        onCloseTrigger={() => setIsPanelOpen(false)}
        setEnabledPluginsTrigger={setEnabledPluginIds}
        enabledPluginIds={enabledPluginIds}
        registeredPlugins={registeredPlugins}
      />
      <SpeedDial
        enabledPluginIds={enabledPluginIds}
        setIsPanelOpenTrigger={setIsPanelOpen}
        registeredPlugins={registeredPlugins}
      />
      {renderEnabledPlugins()}
    </RootStyles>,
    container
  );
}
