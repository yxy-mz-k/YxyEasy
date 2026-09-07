/**
 * Get the configuration file variable name
 * @param env
 */
import { globalConfig } from "utils/global";
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${
    globalConfig?.VITE_GLOB_APP_SHORT_NAME || "__APP"
  }__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
};
