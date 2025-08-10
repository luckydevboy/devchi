import type { PluginId } from "./plugins/types";

export interface Plugin {
  id: PluginId;
  shortName: string;
  fullName: string;
  description: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (arg?: any) => React.ReactNode;
  renderPanel: (
    setEnabledPluginsTrigger: React.Dispatch<React.SetStateAction<PluginId[]>>,
    onRender: () => void
  ) => React.ReactNode;
  onEnable?: () => void;
  onDisable?: () => void;
}
