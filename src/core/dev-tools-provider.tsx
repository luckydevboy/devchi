import React, { createContext, useContext, useState, useEffect } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { pluginManager } from "./plugin-manager";
import { DevtoolsPanel } from "./dev-tools-panel";

type DevtoolsContextType = {
  enabledPlugins: string[];
  togglePlugin: (id: string) => void;
};

const DevtoolsContext = createContext<DevtoolsContextType | undefined>(
  undefined
);

export const DevtoolsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [enabledPlugins, setEnabledPlugins] = useState<string[]>([]);

  const togglePlugin = (id: string) => {
    // Check if the plugin is registered
    const plugin = pluginManager.getPluginById(id);
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

  useEffect(() => {
    // Enable plugins that are enabledByDefault is true
    pluginManager.getPlugins().forEach((plugin) => {
      if (plugin.enabledByDefault) {
        plugin.onEnable?.();
        setEnabledPlugins((prev) => [...prev, plugin.id]);
      }
    });
  }, []);

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
      <DevtoolsContext.Provider value={{ togglePlugin, enabledPlugins }}>
        {children}
        <DevtoolsPanel />
      </DevtoolsContext.Provider>
    </ErrorBoundary>
  );
};

export const useDevtools = () => {
  const ctx = useContext(DevtoolsContext);
  if (!ctx) throw new Error("useDevtools must be used inside DevtoolsProvider");
  return ctx;
};
