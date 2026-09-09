import type { GlobConfig } from "types/config";

import { warn } from "utils/log";
import { getGlobalConfig } from "utils/global";

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
  const VITE_GLOB_API_URL = () => {
    const globalConfig = getGlobalConfig();
    return globalConfig?.isEnv ? `${globalConfig?.suffixApi}-center` : "../";
  };

  const VITE_GLOB_UPLOAD_URL = () => {
    const globalConfig = getGlobalConfig();
    return globalConfig?.isEnv
      ? `${
          globalConfig?.suffixApi
        }-center${getUrlRelativePath()}/api/file/upload`
      : getUrlRelativePath() + "/api/file/upload";
  };

  return {
    get title() {
      return getGlobalConfig()?.name;
    },
    get apiUrl() {
      return VITE_GLOB_API_URL();
    },
    get shortName() {
      return getGlobalConfig()?.VITE_GLOB_APP_SHORT_NAME;
    },
    get urlPrefix() {
      return null;
    },
    get uploadUrl() {
      return VITE_GLOB_UPLOAD_URL();
    },
  } as Readonly<GlobConfig>;
};
