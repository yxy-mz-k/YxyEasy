import { defHttp } from "utils/http/index";
import { getGlobalConfig } from "utils/global";
enum Api {
  getDic = "/api/sys/dictTree",
  dictValue = "/uauth/sysMng/sysDcit/dictValue",
}

export const getDictTreeByDictCode = (dictCode) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};

export const getDicListByDictCodeToTable = (params) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getDic}`,
    params,
  });
};

export const getDicListByDictCode = (dictCode) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url:
      globalConfig?.key == "uauth"
        ? Api?.dictValue
        : `${globalConfig?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};
