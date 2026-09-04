import type { ErrorMessageMode } from "types/axios";
import { useMessage } from "hooks/web/useMessage";
import { useI18n } from "hooks/web/useI18n";
import router from "router/index";
// import { PageEnum } from 'enums/pageEnum';
import { useUserStoreWithOut } from "store/modules/user";
import projectSetting from "settings/projectSetting";
import { SessionTimeoutProcessingEnum } from "enums/appEnum";
const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;
import { doLogout, getUserInfo, loginApi } from "api/sys/user";
import { useConfigStore } from "store/modules/config";
// * @description: logout
// */

export function checkStatus(
  status: number,
  msg: string,
  result: any,
  errorMessageMode: ErrorMessageMode = "message",
): void {
  const EASYCONFIG = useConfigStore();
  const { t } = useI18n();
  const userStore = useUserStoreWithOut();
  let errMessage = "";

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
      // errMessage = msg || t('sys.api.errMsg401');
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        if (window.location.search) {
          const user_token =
            new URL(window.location.href).searchParams.get("user_token") ?? "";
          userStore.setToken(user_token);
          window.location.href =
            window.location.origin +
            EASYCONFIG?.project +
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
      errMessage = t("sys.api.errMsg403");
      break;
    // 404请求不存在
    case 404:
      errMessage = t("sys.api.errMsg404");
      break;
    case 405:
      errMessage = t("sys.api.errMsg405");
      break;
    case 408:
      errMessage = t("sys.api.errMsg408");
      break;
    case 500:
      errMessage = t("sys.api.errMsg500");
      break;
    case 501:
      errMessage = t("sys.api.errMsg501");
      break;
    case 502:
      errMessage = t("sys.api.errMsg502");
      break;
    case 503:
      errMessage = t("sys.api.errMsg503");
      break;
    case 504:
      errMessage = t("sys.api.errMsg504");
      break;
    case 505:
      errMessage = t("sys.api.errMsg505");
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === "modal") {
      createErrorModal({ title: t("sys.api.errorTip"), content: errMessage });
    } else if (errorMessageMode === "message") {
      error({
        content: errMessage,
        key: `global_error_message_status_${status}`,
      });
    }
  }
}
