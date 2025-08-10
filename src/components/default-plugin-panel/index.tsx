import { useState } from "react";

import classes from "./styles.module.css";
import { ENABLED_PLUGIN_IDS_KEY } from "../..";
import type { PluginId } from "../../plugins/types";
import type { Plugin } from "../../types";
import Switch from "../ui/switch";

interface IProps {
  onRenderTrigger: () => void;
  title: string;
  description: string;
  setEnabledPluginsTrigger: React.Dispatch<React.SetStateAction<PluginId[]>>;
  pluginId: PluginId;
}

export default function DefaultPluginPanel({
  onRenderTrigger,
  title,
  description,
  setEnabledPluginsTrigger,
  pluginId,
}: IProps) {
  const [isChecked, setIsChecked] = useState(() => {
    const savedEnabledPluginIds = localStorage.getItem(ENABLED_PLUGIN_IDS_KEY);
    if (savedEnabledPluginIds) {
      return Boolean(
        (JSON.parse(savedEnabledPluginIds) as PluginId[]).find(
          (pid) => pid === pluginId
        )
      );
    }
    return false;
  });

  return (
    <div className={classes["panel"]}>
      <div className={classes["panel__title"]}>{title}</div>
      <div className={classes["panel__description"]}>{description}</div>

      <div className={classes["panel__switch-wrapper"]}>
        <div className={classes["panel__switch-wrapper-title"]}>Enable</div>
        <Switch
          isChecked={isChecked}
          onChangeTrigger={() => {
            if (!isChecked) {
              onRenderTrigger();
            } else {
              setEnabledPluginsTrigger((prev) =>
                prev.filter((pid) => pid !== pluginId)
              );
            }
            setIsChecked(!isChecked);
          }}
        />
      </div>
    </div>
  );
}
