import Devchi from "./components/devchi";
import type { PluginId } from "./plugins/types";

interface IProps {
  pluginIds: PluginId[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactQueryClient?: any;
  isDevelopment: boolean;
}

export default function DevchiRoot(props: IProps) {
  const { isDevelopment, ...restProps } = props;

  const urlParams = new URLSearchParams(window.location.search);
  const devchiParam = urlParams.get("devchi") === "true";

  if (!isDevelopment && !devchiParam) {
    return null;
  }

  return <Devchi {...restProps} />;
}
