import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";

enum Api {
  AllList = getUrlRelativePath() + "/api/product/getAllListProduct",
  list = getUrlRelativePath() + "/api/device/list",
  findUnionList = getUrlRelativePath() + "/api/factor/findUnionList",
  queryDeviceFactor = getUrlRelativePath() + "/api/factor/queryDeviceFactor",
  aqilist = getUrlRelativePath() + "/api/device/aqiDevicelist",
  queryById = "/ioe/api/cfgprojectdes/queryById",
  edit = "/ioe/api/cfgprojectdes/edit",
  queryTy = "/ioe/api/cfgprojectdes/queryTy",
  devices = "/ioe/api/cfgprojectdesdevice/devices",
  parkGetMonitorNewData = "/eq/api/monitorData/getMonitorNewData",
}

//获取管理列表--查询所有的产品信息。不分页的查询
export const getAllListProduct = (params: any) => {
  return defHttp.post<any>({
    url: Api.AllList,
    params: params,
  });
};

//获取管理列表
export const getAllListDevice = (params: any) => {
  return defHttp.post<any>({
    url: Api.list,
    params: params,
  });
};

export const findUnionList = (params: any) => {
  return defHttp.get<any>({
    url: Api.findUnionList,
    params: params,
  });
};

export const queryDeviceFactor = (params: any) => {
  return defHttp.get<any>({
    url: Api.queryDeviceFactor,
    params: params,
  });
};

export const aqilist = (params: any) => {
  return defHttp.post<any>({
    url: Api.aqilist,
    params: params,
  });
};

export function queryById(params: any) {
  return defHttp.post<any>({
    url: Api.queryById,
    params: params,
  });
}

export function edit(params: any) {
  return defHttp.post<any>(
    {
      url: Api.edit,
      params: params,
    },
    {
      isReturnMessage: true,
    },
  );
}
export function queryTy(params: any) {
  return defHttp.post<any>({
    url: Api.queryTy,
    params: params,
  });
}

export function devices(params: any) {
  return defHttp.post<any>({
    url: Api.devices,
    params: params,
  });
}
export function parkGetMonitorNewData(params: any) {
  return defHttp.post<any>({
    url: Api.parkGetMonitorNewData,
    params: params,
  });
}
