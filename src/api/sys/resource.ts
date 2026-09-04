import { defHttp } from "utils/http/index";

enum Api {
  sysResourceBelong = "/uauth/sysMng/sysResource/belong",
  getSysResource = "/uauth/sysMng/sysResource/pageList",
  bindResource = "/uauth/sysMng/sysResource/bind",
}

//根据角色id查询绑定的资源
export const getSysResourceBelong = (params: any) => {
  return defHttp.post<any>({
    url: Api.sysResourceBelong,
    params: params,
  });
};
//绑定
export const bindResourceApi = (params: any) => {
  return defHttp.post<any>({
    url: Api.bindResource,
    params: params,
  });
};
//根据类别获取资源列表
export const getResourceBySourceType = (sourceType) => {
  return defHttp.post<any>({
    url: Api.getSysResource,
    params: { sourceType: sourceType, status: "1", pageNo: 1, pageSize: 9999 },
  });
};

//根据类别获取资源列表--分组管理
export const getResourceBySourceTypeGroup = (params) => {
  return defHttp.post<any>({
    url: Api.getSysResource,
    params: params,
  });
};
