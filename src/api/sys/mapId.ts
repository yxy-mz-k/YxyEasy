import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";

enum Api {
  queryId = getUrlRelativePath() + "/api/maxId",
}

export const getMapId = (params) => {
  return defHttp.post<any>({
    url: Api.queryId,
    params,
  });
};
