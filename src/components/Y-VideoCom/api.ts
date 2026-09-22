import { defHttp } from "utils/http/index";
import { getUrlRelativePath } from "utils/handleApiUrl";
import { getGlobalConfig } from "utils/global";

enum Api {
  getPlayAddrioe = getUrlRelativePath() + "/api/video/getPlayAddr",
  controllingioe = getUrlRelativePath() + "/api/video/controlling",
  getPlayAddr = getUrlRelativePath() + "/api/ioe/video/getPlayAddr",
  controlling = getUrlRelativePath() + "/api/ioe/video/controlling",
}

export const getPlayAddr = (params: any) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "ioe" ? Api.getPlayAddrioe : Api.getPlayAddr,
    params: params,
  });
};
export const controlling = (params: any) => {
  let globalConfig = getGlobalConfig();
  return defHttp.post<any>({
    url: globalConfig?.key == "ioe" ? Api.controllingioe : Api.controlling,
    params: params,
  });
};
