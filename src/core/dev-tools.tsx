import { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { DevtoolsPanel } from "./dev-tools-panel";
import { PLUGIN_ID, type PluginID } from "../plugins/constants";
import type { DevToolPlugin } from "./types";
// TODO: Import plugins when are registered.
import { ErudaPlugin } from "../plugins/eruda";

const mapPluginNameToPlugin: Record<PLUGIN_ID, DevToolPlugin> = {
  [PLUGIN_ID.ERUDA_3]: ErudaPlugin,
};

// TODO: Restrict this component in production mode. Just plugins with query param are allowed.
export const Devtools = ({ plugins }: { plugins: PluginID[] }) => {
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

  function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <DevtoolsPanel
        registeredPlugins={registerPlugins}
        enabledPlugins={enabledPlugins}
        togglePlugin={togglePlugin}
      />
    </ErrorBoundary>
  );
};
