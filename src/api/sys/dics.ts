import { defHttp } from "utils/http/index";
import { globalConfig } from "utils/global";
enum Api {
  getDic = "/api/sys/dictTree",
}

export const getDictTreeByDictCode = (dictCode) => {
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};
