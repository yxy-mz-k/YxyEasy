import { defHttp } from "utils/http/index";
import { useConfigStore } from "store/modules/config";
// import { getMenuListResultModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/uauth/sys/user/appMenu', //能请
  GetMenuList = "/api/sys/user/appMenu",
  GetAppList = "/uauth/sysMng/sysApp/pageList",
}

/*
 * @description: Get user menu based on id
 */
export const getMenuList = (params) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.GetMenuList}`,
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
