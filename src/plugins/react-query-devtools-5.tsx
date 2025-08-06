import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createPortal } from "react-dom";

import { PLUGIN_ID } from "./constants";
import type { Plugin } from "../types";

const REACT_QUERY_DEVTOOLS_BTN_CLASS = "tsqd-open-btn-container";
const REACT_QUERY_DEVTOOLS_CONTAINER_ID = "react-query-devtools";

export const ReactQueryDevtools5Plugin: Plugin = {
  id: PLUGIN_ID.REACT_QUERY_Devtools_5,
  name: "React Query Devtools 5",
  render: (client) => {
    let container = document.getElementById(REACT_QUERY_DEVTOOLS_CONTAINER_ID);

    if (!container) {
      container = document.createElement("div");
      container.id = REACT_QUERY_DEVTOOLS_CONTAINER_ID;
      document.documentElement.insertBefore(container, document.body);
      const btn = document.querySelector(`.${REACT_QUERY_DEVTOOLS_BTN_CLASS}`);
      btn?.remove();
    }

    return createPortal(
      <ReactQueryDevtools initialIsOpen client={client} />,
      container
    );
  },
  onDisable: () => {
    const container = document.getElementById(
      REACT_QUERY_DEVTOOLS_CONTAINER_ID
    );

    container?.remove();
  },
};
