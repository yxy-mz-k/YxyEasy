import type { GlobConfig } from "types/config";

import { warn } from "utils/log";
import { getAppEnvConfig } from "utils/env";
import { globalConfig } from "utils/global";

const isEnv = import.meta.env["MODE"] === "development" ? true : false;

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const VITE_GLOB_API_URL = isEnv ? `${globalConfig?.suffixApi}-center` : "../";
  const VITE_GLOB_API_URL_PREFIX = null;
  const VITE_GLOB_UPLOAD_URL = isEnv
    ? `${globalConfig?.suffixApi}-center` +
      getUrlRelativePath() +
      "/api/file/upload"
    : getUrlRelativePath() + "/api/file/upload";

  const VITE_GLOB_APP_TITLE = globalConfig?.name;
  const {
    // VITE_GLOB_APP_TITLE,
    // VITE_GLOB_APP_SHORT_NAME,
    // VITE_GLOB_API_URL_PREFIX,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(globalConfig?.VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: globalConfig?.VITE_GLOB_APP_SHORT_NAME,
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
