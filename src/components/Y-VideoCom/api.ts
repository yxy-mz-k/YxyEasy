import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";

enum Api {
  getPlayAddr = getUrlRelativePath() + "/api/ioe/video/getPlayAddr",
  controlling = getUrlRelativePath() + "/api/ioe/video/controlling",
}

export const getPlayAddr = (params: any) => {
  return defHttp.post<any>({
    url: Api.getPlayAddr,
    params: params,
  });
};
export const controlling = (params: any) => {
  return defHttp.post<any>({
    url: Api.controlling,
    params: params,
  });
};
