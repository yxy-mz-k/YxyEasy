import { defHttp } from "utils/http/index";
import { globalConfig } from "utils/global";

enum Api {
  getFieldsDic = "/api/sys/dictTree",
}

export const getFieldsList = () => {
  return defHttp.post<any>({
    url: `${globalConfig?.suffixApi}${Api.getFieldsDic}`,
    params: { dictCode: "value_type" },
  });
};
