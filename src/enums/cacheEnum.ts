import { useConfigStore } from "store/modules/config";
const EASYCONFIG = useConfigStore();
// import { project } from "settings/configSetting";
// token key
export const TOKEN_KEY = "TOKEN__" + EASYCONFIG?.project;

export const LOCALE_KEY = "LOCALE__" + EASYCONFIG?.project;

// user info key
export const USER_INFO_KEY = "USER__INFO__" + EASYCONFIG?.project;

// role info key
export const ROLES_KEY = "ROLES__KEY__" + EASYCONFIG?.project;

// project config key
export const PROJ_CFG_KEY = "PROJ__CFG__KEY__" + EASYCONFIG?.project;
export const API_ADDRESS = "API_ADDRESS__" + EASYCONFIG?.project;

// lock info
export const LOCK_INFO_KEY = "LOCK__INFO__KEY__" + EASYCONFIG?.project;

export const MULTIPLE_TABS_KEY = "MULTIPLE_TABS__KEY__" + EASYCONFIG?.project;

export const APP_DARK_MODE_KEY_ = "__APP__DARK__MODE__" + EASYCONFIG?.project;

// base global local key
export const APP_LOCAL_CACHE_KEY = "COMMON__LOCAL__KEY__" + EASYCONFIG?.project;

export const APP_LOCAL_CACHETOKEN_KEY =
  "COMMON__LOCALTOKEN__KEY__" + EASYCONFIG?.project;

// base global session key
export const APP_SESSION_CACHE_KEY =
  "COMMON__SESSION__KEY__" + EASYCONFIG?.project;

// table 列设置
export const TABLE_SETTING_KEY = "TABLE__SETTING__KEY__" + EASYCONFIG?.project;

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
