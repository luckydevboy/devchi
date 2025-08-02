export interface DevToolPlugin {
  id: string;
  name: string;
  icon?: React.ReactNode;
  enabledByDefault?: boolean;
  // Optional UI to render inside the devtools panel
  render?: () => React.ReactNode;
  // Code to run when the plugin is enabled (e.g. inject Eruda)
  onEnable?: () => void;
  // Cleanup when disabled
  onDisable?: () => void;
}
