import React from "react";
import { pluginManager } from "./plugin-manager";
import { useDevtools } from "./dev-tools-provider";

export const DevtoolsPanel: React.FC = () => {
  const { togglePlugin, enabledPlugins } = useDevtools();
  const plugins = pluginManager.getPlugins();

  return (
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
      }}
    >
      <strong>Devtools</strong>
      <ul
        style={{
          listStyleType: "none",
          marginBlockStart: 0,
          paddingInlineStart: 0,
          marginBlockEnd: 0,
        }}
      >
        {plugins.map((plugin) => (
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
      {plugins.map((plugin) =>
        enabledPlugins.includes(plugin.id) && plugin.render ? (
          <div key={plugin.id}>{plugin.render()}</div>
        ) : null
      )}
    </div>
  );
};
