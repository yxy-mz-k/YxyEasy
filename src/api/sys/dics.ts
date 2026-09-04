import { defHttp } from "utils/http/index";
import { useConfigStore } from "store/modules/config";

enum Api {
  getDic = "/api/sys/dictTree",
}

export const getDictTreeByDictCode = (dictCode) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};
