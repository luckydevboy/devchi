import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { createPortal } from "react-dom";

import { PLUGIN_ID } from "./constants";
import DefaultPluginPanel from "../components/default-plugin-panel";
import type { Plugin } from "../types";

const REACT_QUERY_DEVTOOLS_CONTAINER_ID = "react-query-devtools";

export function createReactQueryDevtools5Plugin(): Plugin {
  let setOpenState: ((v: boolean) => void) | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Wrapper({ client }: { client: any }) {
    const [isOpen, setIsOpen] = useState(false);
    setOpenState = setIsOpen;

    let container = document.getElementById(REACT_QUERY_DEVTOOLS_CONTAINER_ID);
    if (!container) {
      container = document.createElement("div");
      container.id = REACT_QUERY_DEVTOOLS_CONTAINER_ID;
      container.style.position = "fixed";
      container.style.bottom = "0";
      container.style.right = "0";
      container.style.left = "0";
      document.documentElement.insertBefore(container, document.body);
    }

    return createPortal(
      isOpen ? (
        <ReactQueryDevtoolsPanel
          client={client}
          onClose={() => setIsOpen(false)}
        />
      ) : null,
      container
    );
  }

  return {
    id: PLUGIN_ID.REACT_QUERY_Devtools_5,
    shortName: "RQ",
    fullName: "React Query Devtools",
    description: "React Query Devtools",
    render: (client) => <Wrapper client={client} />,
    onEnable: () => setOpenState?.(true),
    onDisable: () => {
      setOpenState?.(false);
      const container = document.getElementById(
        REACT_QUERY_DEVTOOLS_CONTAINER_ID
      );
      container?.remove();
    },
    renderPanel: (setEnabledPluginsTrigger, onRender) => (
      <DefaultPluginPanel
        onRenderTrigger={onRender}
        setEnabledPluginsTrigger={setEnabledPluginsTrigger}
        pluginId={PLUGIN_ID.REACT_QUERY_Devtools_5}
        title="React Query Devtools"
        description="React Query Devtools"
      />
    ),
  };
}
