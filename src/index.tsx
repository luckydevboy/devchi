import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import DevchiPanel from "./components/devchi-panel";
import Root from "./components/root";
import SpeedDial from "./components/speed-dial";
import { PLUGIN_ID } from "./plugins/constants";
import type { PluginID } from "./plugins/types";
import type { Plugin } from "./types";

const mapPluginNameToPlugin: Record<PLUGIN_ID, () => Promise<Plugin>> = {
  [PLUGIN_ID.ERUDA_3]: async () =>
    await import("./plugins/eruda-3").then((res) => res.Eruda3Plugin),
  [PLUGIN_ID.REACT_QUERY_Devtools_5]: async () =>
    await import("./plugins/react-query-devtools-5").then((res) =>
      res.createReactQueryDevtools5Plugin()
    ),
};

const DEVCHI_PANEL_ID = "devchi";

interface IProps {
  plugins: PluginID[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactQueryClient?: any;
}

export default function Devchi(props: IProps) {
  const { plugins, reactQueryClient } = props;

  const [registeredPlugins, setRegisteredPlugins] = useState<Plugin[]>([]);
  const [enabledPlugins, setEnabledPlugins] = useState<Plugin[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    const loadPlugins = async () => {
      const loaded = await Promise.all(
        plugins.map(async (id) => {
          const loadPlugin = mapPluginNameToPlugin[id];
          const plugin = await loadPlugin();
          return plugin;
        })
      );
      setRegisteredPlugins(loaded);
    };

    loadPlugins();
  }, [plugins]);

  let container = document.getElementById(DEVCHI_PANEL_ID);

  if (!container) {
    container = document.createElement("div");
    container.id = DEVCHI_PANEL_ID;
    document.documentElement.insertBefore(container, document.body);
  }

  function renderEnabledPlugins() {
    return enabledPlugins.map((plugin) => {
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
    <Root>
      <DevchiPanel
        isPanelOpen={isPanelOpen}
        onCloseTrigger={() => setIsPanelOpen(false)}
        setEnabledPluginsTrigger={setEnabledPlugins}
        enabledPlugins={enabledPlugins}
        registeredPlugins={registeredPlugins}
      />
      <SpeedDial
        enabledPlugins={enabledPlugins}
        setIsPanelOpenTrigger={setIsPanelOpen}
      />
      {renderEnabledPlugins()}
    </Root>,
    container
  );
}
