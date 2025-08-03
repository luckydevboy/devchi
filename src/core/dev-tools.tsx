import { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { DevtoolsPanel } from "./dev-tools-panel";
import type { DevToolPlugin } from "./types";
import { PLUGIN_ID, type PluginID } from "../plugins/constants";
// TODO: Import plugins when are registered to avoid importing them in the main bundle.
import { ErudaPlugin } from "../plugins/eruda";
import { ReactQueryDevtoolsPlugin } from "../plugins/react-query-devtools";

const mapPluginNameToPlugin: Record<PLUGIN_ID, DevToolPlugin> = {
  [PLUGIN_ID.ERUDA_3]: ErudaPlugin,
  [PLUGIN_ID.REACT_QUERY_Devtools_5]: ReactQueryDevtoolsPlugin,
};

// TODO: Restrict this component in production mode. Just plugins with query param are allowed. Handle bundle size.
// TODO: save enabled plugins in localStorage so for every page reload it will be enabled.
// TODO: If one of plugin are react-query-devtools-*, make sure reactQueryClient is passed.

interface IProps {
  plugins: PluginID[];
  // TODO: Add type for reactQueryClient
  reactQueryClient?: any;
}

export function Devtools(props: IProps) {
  const { plugins, reactQueryClient } = props;

  const [enabledPlugins, setEnabledPlugins] = useState<PluginID[]>([]);

  const registerPlugins = plugins.map((id) => mapPluginNameToPlugin[id]);

  const togglePlugin = (id: PluginID) => {
    // Check if the plugin is registered
    const plugin = mapPluginNameToPlugin[id];
    if (!plugin) return;

    const isEnabled = enabledPlugins.includes(id);
    if (isEnabled) {
      plugin.onDisable?.();
      setEnabledPlugins((prev) => prev.filter((p) => p !== id));
    } else {
      plugin.onEnable?.();
      setEnabledPlugins((prev) => [...prev, id]);
    }
  };

  function fallbackRender({ error }: FallbackProps) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <DevtoolsPanel
        registeredPlugins={registerPlugins}
        enabledPlugins={enabledPlugins}
        togglePlugin={togglePlugin}
        reactQueryClient={reactQueryClient}
      />
    </ErrorBoundary>
  );
}
