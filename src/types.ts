import type { PluginID } from "./plugins/types";

export interface Plugin {
  id: PluginID;
  name: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (arg?: any) => React.ReactNode;
  onEnable?: () => void;
  onDisable?: () => void;
}
