import { useRef, useState } from "react";

import classes from "./styles.module.css";
import type { PluginId } from "../../plugins/types";
import type { Plugin } from "../../types";

interface IProps {
  setIsPanelOpenTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  enabledPluginIds: PluginId[];
  registeredPlugins: Plugin[];
}

export default function SpeedDial({
  setIsPanelOpenTrigger,
  enabledPluginIds,
  registeredPlugins,
}: IProps) {
  const [shownPluginIds, setShownPluginIds] = useState<PluginId[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const heldRef = useRef(false);

  const showPlugin = (pluginId: PluginId) => {
    const plugin = registeredPlugins.find((p) => p.id === pluginId);

    if (shownPluginIds.find((pid) => pid === pluginId)) {
      plugin?.onDisable?.();
      setShownPluginIds((prev) => prev.filter((pid) => pid !== pluginId));
    } else {
      plugin?.onEnable?.();
      setShownPluginIds((prev) => [...prev, pluginId]);
    }
  };

  const handleMouseDown = () => {
    heldRef.current = false;
    timerRef.current = setTimeout(() => {
      heldRef.current = true;
      setIsPanelOpenTrigger((prev) => !prev);
    }, 1000);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!heldRef.current && enabledPluginIds.length) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  function renderEnabledPlugins() {
    if (!isOpen) return null;

    return (
      <div className={classes["speed-dial__children"]}>
        {enabledPluginIds.map((pluginId) => (
          <button
            className={`${classes["speed-dial__btn"]} ${classes["speed-dial__btn--child"]}`}
            key={pluginId}
            onClick={() => showPlugin(pluginId)}
          >
            {registeredPlugins.find((p) => p.id === pluginId)?.shortName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={classes["speed-dial"]}>
      <button
        className={`${classes["speed-dial__btn"]} ${classes["speed-dial__btn--main"]}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        DE
      </button>
      {renderEnabledPlugins()}
    </div>
  );
}
