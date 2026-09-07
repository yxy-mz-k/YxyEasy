/**
 * Get the configuration file variable name
 * @param env
 */
import { useConfigStore } from "store/modules/config";
export const getConfigFileName = (env: Record<string, any>) => {
  const EASYCONFIG = useConfigStore();
  return `__PRODUCTION__${
    EASYCONFIG?.VITE_GLOB_APP_SHORT_NAME || "__APP"
  }__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
};
