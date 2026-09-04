import type { GlobConfig } from "types/config";
import { useConfigStore } from "store/modules/config";

import { warn } from "utils/log";
import { getAppEnvConfig } from "utils/env";

const isEnv = import.meta.env["MODE"] === "development" ? true : false;

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const EASYCONFIG = useConfigStore();

  const VITE_GLOB_API_URL = isEnv ? `${EASYCONFIG?.suffixApi}-center` : "../";
  const VITE_GLOB_API_URL_PREFIX = null;
  const VITE_GLOB_UPLOAD_URL = isEnv
    ? `${EASYCONFIG?.suffixApi}-center` +
      getUrlRelativePath() +
      "/api/file/upload"
    : getUrlRelativePath() + "/api/file/upload";
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_SHORT_NAME,
    // VITE_GLOB_API_URL_PREFIX,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
};

export * from "./useHeaderSetting";
export * from "./useMenuSetting";
export * from "./useMultipleTabSetting";
export * from "./useRootSetting";
export * from "./useTransitionSetting";
