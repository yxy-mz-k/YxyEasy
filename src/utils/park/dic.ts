import { defHttp } from "utils/http/index";

enum Api {
  //字典值得接口
  dictCode = getUrlRelativePath() + "/api/sys/dictTree",
}
/**
 * 获取当前上下文路径
 */
var contextPath;
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
// 获取字典值
export const getdictCode = (params: any) => {
  return defHttp.post<any>({
    url: Api.dictCode,
    params: params,
  });
};
// dictCode
