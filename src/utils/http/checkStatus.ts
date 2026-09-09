import type { ErrorMessageMode } from "types/axios";
import { useMessage } from "hooks/web/useMessage";
// import { PageEnum } from 'enums/pageEnum';
import { useUserStoreWithOut } from "store/modules/user";
import projectSetting from "settings/projectSetting";
import { SessionTimeoutProcessingEnum } from "enums/appEnum";
const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;
import { getGlobalConfig } from "utils/global";
// * @description: logout
// */

export function checkStatus(
  status: number,
  msg: string,
  result: any,
  errorMessageMode: ErrorMessageMode = "message",
): void {
  const userStore = useUserStoreWithOut();
  let errMessage = "";
  let globalConfig = getGlobalConfig();

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
      }
      localStorage.clear();
      setCookie("user_token", "", -1);
      userStore.setToken(undefined);
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        if (window.location.search) {
          const user_token =
            new URL(window.location.href).searchParams.get("user_token") ?? "";
          userStore.setToken(user_token);
          window.location.href =
            window.location.origin +
            globalConfig?.project +
            window.location.href.substring(
              window.location.href.lastIndexOf("#"),
              window.location.href.length,
            );
        } else {
          // debugger
          window.location.href =
            result.login_page +
            "?appId=" +
            result.appId +
            "&redirect_uri=" +
            encodeURIComponent(window.location.href);
          // logout(true)
        }
      }
      break;
    case 403:
      errMessage = "用户得到授权，但是访问是被禁止的。!";
      break;
    // 404请求不存在
    case 404:
      errMessage = "网络请求错误,未找到该资源!";
      break;
    case 405:
      errMessage = "网络请求错误,请求方法未允许!";
      break;
    case 408:
      errMessage = "网络请求超时!";
      break;
    case 500:
      errMessage = "服务器错误,请联系管理员!";
      break;
    case 501:
      errMessage = "网络未实现!";
      break;
    case 502:
      errMessage = "网络错误!";
      break;
    case 503:
      errMessage = "服务不可用，服务器暂时过载或维护!";
      break;
    case 504:
      errMessage = "网络超时!";
      break;
    case 505:
      errMessage = "http版本不支持该请求!";
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === "modal") {
      createErrorModal({ title: "错误提示", content: errMessage });
    } else if (errorMessageMode === "message") {
      error({
        content: errMessage,
        key: `global_error_message_status_${status}`,
      });
    }
  }
}
