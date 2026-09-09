import { defHttp } from "utils/http/index";
// import { getMenuListResultModel } from './model/menuModel';
import { getGlobalConfig } from "utils/global";

enum Api {
  // GetMenuList = '/uauth/sys/user/appMenu', //能请
  GetMenuList = "/api/sys/user/appMenu",
  GetAppList = "/uauth/sysMng/sysApp/pageList",
}

/*
 * @description: Get user menu based on id
 */
export const getMenuList = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.GetMenuList}`,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const getAppList = (params) => {
  return defHttp.post<any>({
    url: Api.GetAppList,
    params,
  });
};
