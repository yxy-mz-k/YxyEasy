import { UploadApiResult } from "./model/uploadModel";
import { defHttp } from "utils/http/index";
import { UploadFileParams } from "types/axios";
import { useGlobSetting } from "hooks/setting/useGlobalSetting";

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
) {
  const { uploadUrl = "" } = useGlobSetting();
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
