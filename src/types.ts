import type { PluginID } from "./plugins/types";

export interface Plugin {
  id: PluginID;
  shortName: string;
  fullName: string;
  description: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (arg?: any) => React.ReactNode;
  renderPanel: (
    setEnabledPluginsTrigger: React.Dispatch<React.SetStateAction<Plugin[]>>,
    onRender: () => void
  ) => React.ReactNode;
  onEnable?: () => void;
  onDisable?: () => void;
}
