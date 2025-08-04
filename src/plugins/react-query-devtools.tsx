import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createPortal } from "react-dom";

import { PLUGIN_ID } from "./constants";
import type { DevToolPlugin } from "../core/types";

export const ReactQueryDevtoolsPlugin: DevToolPlugin = {
  id: PLUGIN_ID.REACT_QUERY_Devtools_5,
  name: "React Query Devtools",
  render: (client) => {
    let container = document.getElementById("react-query-devtools");

    if (!container) {
      container = document.createElement("div");
      container.id = "react-query-devtools";
      document.documentElement.insertBefore(container, document.body);
    }

    return createPortal(
      <ReactQueryDevtools buttonPosition="bottom-left" client={client} />,
      container
    );
  },
  onDisable: () => {
    // TODO: what about removing React Query Devtools from localStorage?
    const container = document.getElementById("react-query-devtools");
    if (container) {
      container.remove();
    }
  },
};
