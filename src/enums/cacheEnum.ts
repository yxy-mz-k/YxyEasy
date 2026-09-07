let projectKey = "";

import { globalConfig } from "utils/global";

export const cacheKeys = {
  get TOKEN_KEY() {
    return "TOKEN__" + globalConfig?.project;
  },
  get LOCALE_KEY() {
    return "LOCALE__" + projectKey;
  },
  get USER_INFO_KEY() {
    return "USER__INFO__" + projectKey;
  },
  get ROLES_KEY() {
    return "ROLES__KEY__" + projectKey;
  },
  get PROJ_CFG_KEY() {
    return "PROJ__CFG__KEY__" + projectKey;
  },
  get API_ADDRESS() {
    return "API_ADDRESS__" + projectKey;
  },
  get LOCK_INFO_KEY() {
    return "LOCK__INFO__KEY__" + projectKey;
  },
  get MULTIPLE_TABS_KEY() {
    return "MULTIPLE_TABS__KEY__" + projectKey;
  },
  get APP_DARK_MODE_KEY_() {
    return "__APP__DARK__MODE__" + projectKey;
  },
  get APP_LOCAL_CACHE_KEY() {
    return "COMMON__LOCAL__KEY__" + projectKey;
  },
  get APP_LOCAL_CACHETOKEN_KEY() {
    return "COMMON__LOCALTOKEN__KEY__" + projectKey;
  },
  get APP_SESSION_CACHE_KEY() {
    return "COMMON__SESSION__KEY__" + projectKey;
  },
  get TABLE_SETTING_KEY() {
    return "TABLE__SETTING__KEY__" + projectKey;
  },
};
export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
