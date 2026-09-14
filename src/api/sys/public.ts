import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";

enum Api {
  queryById = getUrlRelativePath() + "/api/tasktemplate/queryById",
}

//获取管理列表
export const getInfoById = (params: any) => {
  return defHttp.post<any>({
    url: Api.queryById,
    params: params,
  });
};
