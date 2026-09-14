import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";

enum Api {
  //字典值得接口
  dictCode = getUrlRelativePath() + "/api/sys/dictTree",
}
// 获取字典值
export const getdictCode = (params: any) => {
  return defHttp.post<any>({
    url: Api.dictCode,
    params: params,
  });
};
// dictCode
