import { defHttp } from "utils/http/index";

/**
 * 获取当前上下文路径
 */
let contextPath;
function getUrlRelativePath() {
  if (contextPath) {
    return contextPath;
  }
  const url = document.location.toString();
  const arrUrl = url.split("//");
  const start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  contextPath = "/" + relUrl.split("/")[1];
  return contextPath;
}
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
