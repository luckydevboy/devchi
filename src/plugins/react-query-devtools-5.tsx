import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createPortal } from "react-dom";

import { PLUGIN_ID } from "./constants";
import type { Plugin } from "../types";

export const ReactQueryDevtools5Plugin: Plugin = {
  id: PLUGIN_ID.REACT_QUERY_Devtools_5,
  name: "React Query Devtools 5",
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
    const container = document.getElementById("react-query-devtools");
    if (container) {
      container.remove();
    }
  },
};
