// TODO: follow guidelines
// TODO: how to implement ui components?
// TODO: add eslint config to sort imports
import React from "react";
import type { PluginID } from "../plugins/constants";
import type { DevToolPlugin } from "./types";

export const DevtoolsPanel = ({
  registeredPlugins,
  enabledPlugins,
  togglePlugin,
}: {
  registeredPlugins: DevToolPlugin[];
  enabledPlugins: PluginID[];
  togglePlugin: (id: PluginID) => void;
}) => {
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
          <React.Fragment key={plugin.id}>{plugin.render()}</React.Fragment>
        ) : null
      )}
    </div>
  );
};
