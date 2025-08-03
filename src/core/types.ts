import type { PluginID } from "../plugins/constants";

export interface DevToolPlugin {
  id: PluginID;
  name: string;
  icon?: React.ReactNode;
  // TODO: Add query param support for plugins like Eruda to trigger them in production mode.
  // queryParam?: string;
  render?: (arg?: any) => React.ReactNode;
  onEnable?: () => void;
  onDisable?: () => void;
}
