let projectKey = "";

import { getGlobalConfig } from "utils/global";

export const cacheKeys = {
  get TOKEN_KEY() {
    return "TOKEN__" + getGlobalConfig()?.project;
  },
  get LOCALE_KEY() {
    return "LOCALE__" + getGlobalConfig()?.project;
  },
  get USER_INFO_KEY() {
    return "USER__INFO__" + getGlobalConfig()?.project;
  },
  get ROLES_KEY() {
    return "ROLES__KEY__" + getGlobalConfig()?.project;
  },
  get PROJ_CFG_KEY() {
    return "PROJ__CFG__KEY__" + getGlobalConfig()?.project;
  },
  get API_ADDRESS() {
    return "API_ADDRESS__" + getGlobalConfig()?.project;
  },
  get LOCK_INFO_KEY() {
    return "LOCK__INFO__KEY__" + getGlobalConfig()?.project;
  },
  get MULTIPLE_TABS_KEY() {
    return "MULTIPLE_TABS__KEY__" + getGlobalConfig()?.project;
  },
  get APP_DARK_MODE_KEY_() {
    return "__APP__DARK__MODE__" + getGlobalConfig()?.project;
  },
  get APP_LOCAL_CACHE_KEY() {
    return "COMMON__LOCAL__KEY__" + getGlobalConfig()?.project;
  },
  get APP_LOCAL_CACHETOKEN_KEY() {
    return "COMMON__LOCALTOKEN__KEY__" + getGlobalConfig()?.project;
  },
  get APP_SESSION_CACHE_KEY() {
    return "COMMON__SESSION__KEY__" + getGlobalConfig()?.project;
  },
  get TABLE_SETTING_KEY() {
    return "TABLE__SETTING__KEY__" + getGlobalConfig()?.project;
  },
};
export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
