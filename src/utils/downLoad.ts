import dayjs from "dayjs";
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
  // window.open(url, '_blank');
  const isEnv = import.meta.env["MODE"] === "development" ? true : false;
  const origin = isEnv
    ? import.meta.env["VITE_ORIGIN"]
    : window.location.origin;
  const originSrc = isEnv
    ? import.meta.env["VITE_ORIGIN"]
    : window.location.origin;
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
  const isEnv = import.meta.env["MODE"] === "development" ? true : false;
  const origin = isEnv
    ? import.meta.env["VITE_ORIGIN"]
    : window.location.origin;
  const originSrc = isEnv
    ? import.meta.env["VITE_ORIGIN"]
    : window.location.origin;
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
