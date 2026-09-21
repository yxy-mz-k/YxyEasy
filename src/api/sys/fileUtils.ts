// 文件上传 api
import { useUserStore } from "store/modules/user";
import { defHttp } from "utils/http/index";
import axios from "axios";
import { getGlobalConfig } from "utils/global";
import { getUrlRelativePath } from "utils/handleApiUrl";
enum Api {
  deleteFile = getUrlRelativePath() + "/api/file/delete",
  queryFileById = getUrlRelativePath() + "/api/file/queryById",
  queryByIds = getUrlRelativePath() + "/api/file/queryByIds",
  download = getUrlRelativePath() + "/api/file/download?id=",

  deleteFileSFM = getUrlRelativePath() + "/api/fileMng/deleteById",
  queryFileByIdSFM = getUrlRelativePath() + "/api/fileMng/queryById",
  queryByIdsSFM = getUrlRelativePath() + "/api/fileMng/queryByIds",
  downloadSFM = getUrlRelativePath() + "/api/fileMng/download?id=",
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
      ? globalConfig?.VITE_GLOB_API_URL ??
        `${globalConfig?.suffixApi}-center` +
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

export const uploadFileApiSFM = ({
  file,
  onUploadProgress,
  moreoverParams = null,
}) => {
  let globalConfig = getGlobalConfig();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name || "file");
  formData.append("path", file.path || "file");
  formData.append("type", file.uploadType || "git"); // git，project，img，temp
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
        "/api/fileMng/upload"
      : getUrlRelativePath() + "/api/fileMng/upload",
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

export const deleteFileSFM = (params: any) => {
  return defHttp.post<any>({
    url: Api.deleteFileSFM,
    params: params,
  });
};

export const queryFileByIdSFM = (params: any) => {
  return defHttp.post<any>({
    url: Api.queryFileByIdSFM,
    params: params,
  });
};

export const queryByIdsSFM = (params: any) => {
  return defHttp.post<any>({
    url: Api.queryByIdsSFM,
    params: params,
  });
};

export const downloadSFM = (data: any) => {
  return defHttp.get<any>(
    {
      url: Api.downloadSFM + data,
      responseType: "blob",
    },
    {
      isReturnNativeResponse: true,
    },
  );
};
