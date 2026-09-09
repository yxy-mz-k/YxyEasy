import { defHttp } from "utils/http/index";
import { getGlobalConfig } from "utils/global";
enum Api {
  getDic = "/api/sys/dictTree",
}

export const getDictTreeByDictCode = (dictCode) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};
