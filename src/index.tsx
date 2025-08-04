import React, { useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { PLUGIN_ID } from "./plugins/constants";
import { Eruda3Plugin } from "./plugins/eruda-3";
import { ReactQueryDevtools5Plugin } from "./plugins/react-query-devtools-5";
import type { PluginID } from "./plugins/types";
import type { Plugin } from "./types";

const mapPluginNameToPlugin: Record<PLUGIN_ID, Plugin> = {
  [PLUGIN_ID.ERUDA_3]: Eruda3Plugin,
  [PLUGIN_ID.REACT_QUERY_Devtools_5]: ReactQueryDevtools5Plugin,
};

interface IProps {
  plugins: PluginID[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactQueryClient?: any;
}

export default function Devchi(props: IProps) {
  const { plugins, reactQueryClient } = props;

  const [enabledPlugins, setEnabledPlugins] = useState<PluginID[]>([]);

  const registeredPlugins = plugins.map((id) => mapPluginNameToPlugin[id]);

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
      <div
        style={{
          position: "fixed",
          bottom: "50%",
          left: 10,
          transform: "translateY(50%)",
          border: "1px solid #ddd",
          padding: 10,
          zIndex: 9999,
          textAlign: "left",
          backgroundColor: "black",
        }}
      >
        <strong>Devchi</strong>
        <ul
          style={{
            listStyleType: "none",
            marginBlockStart: 0,
            paddingInlineStart: 0,
            marginBlockEnd: 0,
          }}
        >
          {registeredPlugins.map((plugin) => (
            <li key={plugin.id}>
              <label>
                <input
                  type="checkbox"
                  checked={enabledPlugins.includes(plugin.id)}
                  onChange={() => togglePlugin(plugin.id)}
                />
                {plugin.name}
              </label>
            </li>
          ))}
        </ul>

        {registeredPlugins.map((plugin) =>
          enabledPlugins.includes(plugin.id) && plugin.render ? (
            <React.Fragment key={plugin.id}>
              {plugin.id === "react-query-devtools@5"
                ? plugin.render(reactQueryClient)
                : plugin.render()}
            </React.Fragment>
          ) : null
        )}
      </div>
    </ErrorBoundary>
  );
}
