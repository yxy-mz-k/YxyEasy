import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";
import { getGlobalConfig } from "utils/global";
// import { getMenuListResultModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/uauth/sys/user/appMenu', //能请
  geoAddU = "/uauth/sysMng/geoInfo/add",
  geoEditU = "/uauth/sysMng/geoInfo/edit",
  geoSaveOrEditU = "/uauth/sysMng/geoInfo/saveOrEdit",
  geoLatLonListU = "/uauth/sysMng/geoInfo/getList",
  updateMapTableByIdU = "/uauth/sysMng/geoInfo/updateMapTableById",
  deleteByTableIdU = "/uauth/sysMng/geoInfo/deleteByTableId",
  deleteByIdU = "/uauth/sysMng/geoInfo/deleteById",
  geoQueryByIdU = "/uauth/sysMng/geoInfo/queryById",

  geoAdd = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/add",
  geoEdit = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/edit",
  geoSaveOrEdit = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/saveOrEdit",
  geoLatLonList = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/getList",
  updateMapTableById = getUrlRelativePath() +
    "/api/uauth/sysMng/geoInfo/updateMapTableById",
  deleteByTableId = getUrlRelativePath() +
    "/api/uauth/sysMng/geoInfo/deleteByTableId",
  deleteById = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/deleteById",
  geoQueryById = getUrlRelativePath() + "/api/uauth/sysMng/geoInfo/queryById",
  updateTableId = getUrlRelativePath() +
    "/api/uauth/sysMng/geoInfo/updateTableId",
}

/*
 * @description: Get user menu based on id
 */
export const geoAdd = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoAddU : Api.geoAdd,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoEdit = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoEditU : Api.geoEdit,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoSaveOrEdit = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoSaveOrEditU : Api.geoSaveOrEdit,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoLatLonList = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoLatLonListU : Api.geoLatLonList,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const updateMapTableById = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url:
      globalConfig?.key == "uauth"
        ? Api.updateMapTableByIdU
        : Api.updateMapTableById,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const deleteMapByTableId = (tableId, tableName) => {
  let globalConfig = getGlobalConfig();
  const params = { tableId: tableId, tableName: tableName };
  return defHttp.post<any>({
    url:
      globalConfig?.key == "uauth" ? Api.deleteByTableIdU : Api.deleteByTableId,
    params,
  });
};

export const deleteMapById = (id) => {
  let globalConfig = getGlobalConfig();
  const params = { id: id };
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.deleteByIdU : Api.deleteById,
    params,
  });
};

export const geoQueryById = (id) => {
  let globalConfig = getGlobalConfig();
  const params = { id: id };
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoQueryByIdU : Api.geoQueryById,
    params,
  });
};
export const geoQueryByIdEdit = (params: any) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "uauth" ? Api.geoQueryByIdU : Api.geoQueryById,
    params: params,
  });
};

export const updateTableId = (params) => {
  return defHttp.post<any>({
    url: `${Api.updateTableId}?id=${params.id}&tableId=${params.tableId}`,
    // params,
  });
};
