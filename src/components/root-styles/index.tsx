import classes from "./styles.module.css";

interface IProps {
  children: React.ReactNode;
}

export default function RootStyles(props: IProps) {
  const { children } = props;

  return <div className={classes["devchi-root"]}>{children}</div>;
}
