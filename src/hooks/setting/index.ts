import type { GlobConfig } from "types/config";

import { warn } from "utils/log";
import { getAppEnvConfig } from "utils/env";
import { globalConfig } from "utils/global";

let contextPath;

function getUrlRelativePath() {
  if (contextPath) {
    return contextPath;
  }
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  contextPath = "/" + relUrl.split("/")[1];
  return contextPath;
}
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const VITE_GLOB_API_URL = globalConfig?.isEnv
    ? `${globalConfig?.suffixApi}-center`
    : "../";
  const VITE_GLOB_API_URL_PREFIX = null;
  const VITE_GLOB_UPLOAD_URL = globalConfig?.isEnv
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
