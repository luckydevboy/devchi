import { useRef, useState } from "react";

import classes from "./styles.module.css";
import type { Plugin } from "../../types";

interface IProps {
  setIsPanelOpenTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  enabledPlugins: Plugin[];
}

export default function SpeedDial({
  setIsPanelOpenTrigger,
  enabledPlugins,
}: IProps) {
  const [shownPlugins, setShownPlugins] = useState<Plugin[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const heldRef = useRef(false);

  // TODO: please 
  const showPlugin = (plugin: Plugin) => {
    if (shownPlugins.find((p) => p.id === plugin.id)) {
      plugin.onDisable?.();
      setShownPlugins((prev) => prev.filter((p) => p.id !== plugin.id));
    } else {
      plugin.onEnable?.();
      setShownPlugins((prev) => [...prev, plugin]);
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
    if (!heldRef.current && enabledPlugins.length) {
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
        {enabledPlugins.map((plugin) => (
          <button
            className={`${classes["speed-dial__btn"]} ${classes["speed-dial__btn--child"]}`}
            key={plugin.id}
            onClick={() => showPlugin(plugin)}
          >
            {plugin.shortName}
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
