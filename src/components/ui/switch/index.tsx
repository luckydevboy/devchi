import classes from "./styles.module.css";

interface IProps {
  isChecked?: boolean;
  onChangeTrigger?: (checked: boolean) => void;
  disabled?: boolean;
  onLabel?: string;
  offLabel?: string;
}

export default function Switch({
  isChecked = false,
  onChangeTrigger,
  disabled = false,
  onLabel = "",
  offLabel = "",
}: IProps) {
  const toggle = () => {
    if (disabled) return;
    onChangeTrigger?.(!isChecked);
  };

  const switchClasses = [
    classes.switch,
    isChecked ? classes["switch--on"] : classes["switch--off"],
    disabled ? classes["switch--disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={switchClasses}
      onClick={toggle}
      role="switch"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className={classes["switch__thumb"]} />
      <span className={classes["switch__label"]}>
        {isChecked ? onLabel : offLabel}
      </span>
    </div>
  );
}
