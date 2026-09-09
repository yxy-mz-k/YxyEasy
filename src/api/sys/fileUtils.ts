// 文件上传 api
import { useUserStore } from "store/modules/user";
import { defHttp } from "utils/http/index";
import axios from "axios";
import { getGlobalConfig } from "utils/global";
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
  deleteFile = getUrlRelativePath() + "/api/file/delete",
  queryFileById = getUrlRelativePath() + "/api/file/queryById",
  queryByIds = getUrlRelativePath() + "/api/file/queryByIds",
  download = getUrlRelativePath() + "/api/file/download?id=",
}
export const uploadFileApi = ({
  file,
  onUploadProgress,
  moreoverParams = null,
}) => {
  let globalConfig = getGlobalConfig();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name || "file");
  if (moreoverParams) {
    Object.keys(moreoverParams)?.map((key) => {
      formData.append(key, moreoverParams[key]);
    });
  }
  // ... 略，formData 其他实现逻辑
  // @ts-ignore
  return axios({
    url: globalConfig?.isEnv
      ? `${globalConfig?.suffixApi}-center` +
        getUrlRelativePath() +
        "/api/file/upload"
      : getUrlRelativePath() + "/api/file/upload",
    method: "POST",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
      "X-Access-Token": useUserStore().getToken,
      ignoreCancelToken: true,
    },
    onUploadProgress, // 上传进度回调函数 onUploadProgress(ev)
  });
};

export const deleteFile = (params: any) => {
  return defHttp.post<any>({
    url: Api.deleteFile,
    params: params,
  });
};

export const queryFileById = (params: any) => {
  return defHttp.post<any>({
    url: Api.queryFileById,
    params: params,
  });
};

export const queryByIds = (params: any) => {
  return defHttp.post<any>({
    url: Api.queryByIds,
    params: params,
  });
};

export const download = (data: any) => {
  return defHttp.get<any>(
    {
      url: Api.download + data,
      responseType: "blob",
    },
    {
      isReturnNativeResponse: true,
    },
  );
};
