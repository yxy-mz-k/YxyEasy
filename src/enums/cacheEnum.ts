import { useConfigStore } from "store/modules/config";
// 获取配置的函数
function getProject() {
  const EASYCONFIG = useConfigStore();
  return EASYCONFIG?.project || "default";
}
export const cacheKeys = {
  get TOKEN_KEY() {
    return "TOKEN__" + getProject();
  },
  get LOCALE_KEY() {
    return "LOCALE__" + getProject();
  },
  get USER_INFO_KEY() {
    return "USER__INFO__" + getProject();
  },
  get ROLES_KEY() {
    return "ROLES__KEY__" + getProject();
  },
  get PROJ_CFG_KEY() {
    return "PROJ__CFG__KEY__" + getProject();
  },
  get API_ADDRESS() {
    return "API_ADDRESS__" + getProject();
  },
  get LOCK_INFO_KEY() {
    return "LOCK__INFO__KEY__" + getProject();
  },
  get MULTIPLE_TABS_KEY() {
    return "MULTIPLE_TABS__KEY__" + getProject();
  },
  get APP_DARK_MODE_KEY_() {
    return "__APP__DARK__MODE__" + getProject();
  },
  get APP_LOCAL_CACHE_KEY() {
    return "COMMON__LOCAL__KEY__" + getProject();
  },
  get APP_LOCAL_CACHETOKEN_KEY() {
    return "COMMON__LOCALTOKEN__KEY__" + getProject();
  },
  get APP_SESSION_CACHE_KEY() {
    return "COMMON__SESSION__KEY__" + getProject();
  },
  get TABLE_SETTING_KEY() {
    return "TABLE__SETTING__KEY__" + getProject();
  },
};
export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
