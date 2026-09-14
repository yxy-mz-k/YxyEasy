import type { GlobConfig } from "types/config";
import { getUrlRelativePath } from "utils/handleApiUrl";

import { warn } from "utils/log";
import { getGlobalConfig } from "utils/global";

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
