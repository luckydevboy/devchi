import type { PluginID } from "../plugins/constants";

export interface DevToolPlugin {
  id: PluginID;
  name: string;
  icon?: React.ReactNode;
  render?: (arg?: any) => React.ReactNode;
  onEnable?: () => void;
  onDisable?: () => void;
}
