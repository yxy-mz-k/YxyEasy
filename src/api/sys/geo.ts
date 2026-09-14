import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";
// import { getMenuListResultModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/uauth/sys/user/appMenu', //能请
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
}

/*
 * @description: Get user menu based on id
 */
export const geoAdd = (params) => {
  return defHttp.post<any>({
    url: Api.geoAdd,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoEdit = (params) => {
  return defHttp.post<any>({
    url: Api.geoEdit,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoSaveOrEdit = (params) => {
  return defHttp.post<any>({
    url: Api.geoSaveOrEdit,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const geoLatLonList = (params) => {
  return defHttp.post<any>({
    url: Api.geoLatLonList,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const updateMapTableById = (params) => {
  return defHttp.post<any>({
    url: Api.updateMapTableById,
    params,
  });
};

/**
 * @description: Get user menu based on id
 */
export const deleteMapByTableId = (tableId, tableName) => {
  const params = { tableId: tableId, tableName: tableName };
  return defHttp.post<any>({
    url: Api.deleteByTableId,
    params,
  });
};

export const deleteMapById = (id) => {
  const params = { id: id };
  return defHttp.post<any>({
    url: Api.deleteById,
    params,
  });
};

export const geoQueryById = (id) => {
  const params = { id: id };
  return defHttp.post<any>({
    url: Api.geoQueryById,
    params,
  });
};
export const geoQueryByIdEdit = (params: any) => {
  return defHttp.post<any>({
    url: Api.geoQueryById,
    params: params,
  });
};
