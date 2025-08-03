// TODO: how to implement ui components?
// TODO: make this panel to be hidden or repositioned
// TODO: make plugins positioning to be configurable
// TODO: consider react-query-devtools wont work in production mode
import React from "react";

import type { DevToolPlugin } from "./types";
import type { PluginID } from "../plugins/constants";

interface IProps {
  registeredPlugins: DevToolPlugin[];
  enabledPlugins: PluginID[];
  togglePlugin: (id: PluginID) => void;
  reactQueryClient: any;
}

export function DevtoolsPanel(props: IProps) {
  const { registeredPlugins, enabledPlugins, togglePlugin, reactQueryClient } =
    props;

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
        backgroundColor: "black",
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
          <React.Fragment key={plugin.id}>
            {plugin.id === "react-query-devtools@5"
              ? plugin.render(reactQueryClient)
              : plugin.render()}
          </React.Fragment>
        ) : null
      )}
    </div>
  );
}
