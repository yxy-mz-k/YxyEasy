import { defHttp } from "utils/http/index";
import { getGlobalConfig } from "utils/global";

enum Api {
  getFieldsDic = "/api/sys/dictTree",
}

export const getFieldsList = () => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getFieldsDic}`,
    params: { dictCode: "value_type" },
  });
};
