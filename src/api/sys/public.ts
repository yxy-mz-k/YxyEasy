import { defHttp } from "utils/http/index";

/**
 * 获取当前上下文路径
 */
let contextPath;

function getUrlRelativePath() {
  if (contextPath) {
    return contextPath;
  }
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  contextPath = "/" + relUrl.split("/")[1];
  return contextPath;
}
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
