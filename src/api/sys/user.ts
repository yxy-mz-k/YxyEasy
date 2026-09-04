import { defHttp } from "utils/http/index";
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  VerImageParams,
} from "./model/userModel";

import { ErrorMessageMode } from "types/axios";
import { useUserStoreWithOut } from "store/modules/user";
import { useConfigStore } from "store/modules/config";

enum Api {
  Login = "/uauth/sys/login",
  VerImage = "/uauth/sys/randomImage",
  Logout = "/api/sys/logout",
  GetUserInfo = "/getUserInfo",
  GetPermCode = "/getPermCode",
  TestRetry = "/testRetry",
  EditPassword = "/uauth/sys/user/changeUserPw",
  userInfo = "/api/sys/user/userInfo",
  getUserOrgList = "/api/sys/user/deptTree",
  getAppData = "/api/sys/user/appData",
}
/**
 * @description: user login api
 */
export function userInfoApi() {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.userInfo}`,
  });
}

/**
 * @description: user login api
 */
export function loginApi(
  params: LoginParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<any>(
    {
      url: Api.Login,
      params: params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}

/**
 * @description: user login api
 */
export function getVerImage(
  params: VerImageParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<any>(
    {
      url: Api.VerImage,
      params: params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: true,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo },
    { errorMessageMode: "none" },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  const userStore = useUserStoreWithOut();
  const EASYCONFIG = useConfigStore();
  return defHttp.get({
    url: `${EASYCONFIG?.suffixApi}${Api.Logout}`,
    headers: { "X-Access-Token": userStore.getToken },
  });
}

export function getTokenByApi() {
  const EASYCONFIG = useConfigStore();
  return defHttp.get({
    url: `${EASYCONFIG?.suffixApi}${Api.Logout}`,
    headers: { "X-Access-Token": userStore.getToken },
  });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
//修改密码
export const EditPasswordApi = (params: any) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: Api.EditPassword,
    params: params,
    headers: { appId: EASYCONFIG?.appId },
  });
};

export const getUserOrgList = (params) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.getUserOrgList}`,
    params,
  });
};
export const getAppData = (params: any) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.getAppData}`,
    params: params,
  });
};
