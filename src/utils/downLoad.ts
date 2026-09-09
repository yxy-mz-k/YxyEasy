import dayjs from "dayjs";
import { getGlobalConfig } from "utils/global";
export function exporFile(
  res: any,
  fileName = "file",
  type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
) {
  const currentTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const FN = filenameRegex.exec(res?.headers?.["content-disposition"])?.[1];
  const cnFileName = decodeURIComponent(FN);
  const contentType = res?.headers?.["content-type"];
  const blob = new Blob([res.data], {
    type: contentType ?? type,
  });
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = /* currentTime + */ cnFileName ?? fileName; // xxx.xls/xxx.xlsx
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, cnFileName ?? fileName);
  }
}
export function preView(url: string) {
  let globalConfig = getGlobalConfig();
  // window.open(url, '_blank');
  const origin = globalConfig?.VITE_ORIGIN;
  const originSrc = globalConfig?.VITE_ORIGIN;
  const encodeUrl = encodeURIComponent(
    window.btoa(window.encodeURIComponent(originSrc + url)),
  );
  const handleUrl =
    origin +
    "/preview/onlinePreview?url=" +
    encodeUrl +
    "&officePreviewType=pdf&tifPreviewType=jpg";
  window.open(handleUrl, "_blank");
}
export function downLoad() {}
export function getPreViewUrl(url: string) {
  let globalConfig = getGlobalConfig();
  const origin = globalConfig?.VITE_ORIGIN;
  const originSrc = globalConfig?.VITE_ORIGIN;
  const encodeUrl = encodeURIComponent(
    window.btoa(window.encodeURIComponent(originSrc + url)),
  );
  const handleUrl =
    origin +
    "/preview/onlinePreview?url=" +
    encodeUrl +
    "&officePreviewType=pdf&tifPreviewType=jpg";
  return handleUrl;
}
