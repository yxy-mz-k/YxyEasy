import { defHttp } from "utils/http/index";
import { useConfigStore } from "store/modules/config";

enum Api {
  getFieldsDic = "/api/sys/dictTree",
}

export const getFieldsList = () => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.getFieldsDic}`,
    params: { dictCode: "value_type" },
  });
};
