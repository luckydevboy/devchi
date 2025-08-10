import { useState } from "react";

import classes from "./styles.module.css";
import type { PluginId } from "../../plugins/types";
import type { Plugin } from "../../types";

interface IProps {
  isPanelOpen: boolean;
  onCloseTrigger: () => void;
  enabledPluginIds: PluginId[];
  setEnabledPluginsTrigger: React.Dispatch<React.SetStateAction<PluginId[]>>;
  registeredPlugins: Plugin[];
}

export default function DevchiPanel({
  isPanelOpen,
  onCloseTrigger,
  setEnabledPluginsTrigger,
  enabledPluginIds,
  registeredPlugins,
}: IProps) {
  const [pluginPanel, setPluginPanel] = useState<Plugin | null>(null);

  if (!isPanelOpen) return null;

  return (
    <div>
      <div className={classes["backdrop"]} />
      <div className={classes["devchi-panel"]}>
        <div className={classes["devchi-panel__header"]}>
          <div className={classes["devchi-panel__header-left"]}>
            {pluginPanel && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={classes["devchi-panel__back-btn"]}
                onClick={() => setPluginPanel(null)}
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            )}
            <div className={classes["devchi-panel__title"]}>Devchi</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={classes["devchi-panel__close-btn"]}
            onClick={onCloseTrigger}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className={classes["devchi-panel__divider"]} />
        <div className={classes["devchi-panel__cards"]}>
          {pluginPanel ? (
            <div>
              {pluginPanel.renderPanel(setEnabledPluginsTrigger, () => {
                if (
                  !enabledPluginIds.find(
                    (pluginId) => pluginId === pluginPanel.id
                  )
                ) {
                  setEnabledPluginsTrigger((prev) => [...prev, pluginPanel.id]);
                }
              })}
            </div>
          ) : (
            registeredPlugins.map((plugin) => (
              <div
                key={plugin.id}
                className={classes["devchi-panel__card"]}
                onClick={() => setPluginPanel(plugin)}
              >
                <div>
                  <div className={classes["devchi-panel__card-title"]}>
                    {plugin.fullName}
                  </div>
                  <div className={classes["devchi-panel__card-description"]}>
                    {plugin.description}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
