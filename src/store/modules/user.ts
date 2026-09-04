import type { UserInfo } from "types/store";
import type { ErrorMessageMode } from "types/axios";
import { defineStore } from "pinia";
import { store } from "store/index";
import { RoleEnum } from "enums/roleEnum";
import { PageEnum } from "enums/pageEnum";
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "enums/cacheEnum";
import { getAuthCache, setAuthCache, clearAuthCache } from "utils/auth";
import { GetUserInfoModel, LoginParams } from "api/sys/model/userModel";
import { doLogout, getUserInfo, loginApi } from "api/sys/user";
import { useI18n } from "hooks/web/useI18n";
import { useMessage } from "hooks/web/useMessage";
import { router } from "router/index";
import { usePermissionStore } from "store/modules/permission";
import { RouteRecordRaw } from "vue-router";
import { PAGE_NOT_FOUND_ROUTE } from "router/routes/basic";
import { useFieldsStore } from "store/modules/fields";
import { getFieldsList } from "api/sys/fields";
import { isArray } from "utils/is";
import { h } from "vue";

import { getMenuList } from "api/sys/menu";
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ""; // for null or undefined value

      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = "";
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { createMessage } = useMessage();
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        if (data.code === 0) {
          const { user_token } = data.result;
          const { user } = data.result;
          this.setToken(user_token);
          this.setUserInfo(user);
        } else {
          createMessage.error(data.message);
        }
        const { user_token } = data.result;
        const { user } = data.result;
        return this.afterLoginAction(goHome, user);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(
      goHome?: boolean,
      user?: UserInfo,
    ): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const result = await getFieldsList();
      const fieldStore = useFieldsStore();
      if (result) {
        fieldStore.setFieldsList(result);
      }
      const userInfo: UserInfo = await this.getUserInfoAction(user);
      const sessionTimeout = this.sessionTimeout;
      // alert(sessionTimeout);
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(user?: UserInfo): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      //const userInfo = await getUserInfo();
      const userInfo: UserInfo = user as UserInfo;
      // const { roles = [] } = userInfo;
      // if (isArray(roles)) {
      //   const roleList = roles.map((item) => item.value) as RoleEnum[];
      //   this.setRoleList(roleList);
      // } else {
      //   userInfo.roles = [];
      //   this.setRoleList([]);
      // }
      // this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      const { createMessage } = useMessage();
      if (this.getToken) {
        try {
          const result = await doLogout();
          if (result) {
            createMessage.success(result);
          }
          localStorage.clear();
          this.setUserInfo(null);
          function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            const expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
          }
          setCookie("user_token", "", -1);
        } catch {
          console.error("注销Token失败");
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      clearAuthCache();
      await getMenuList({});
      // router.go(0);
      // location.href = `${
      //   import.meta.env['VITE_ORIGIN']
      // }/uauth/toLogin?redirect_uri=https://192.168.6.153:3100/homstypes/home``${
      //   import.meta.env['VITE_ORIGIN']
      // }/uauth/toLogin?appId=uauth&&redirect_uri=https://192.168.6.153:3101/centertypes/uauth/resmanage/collection`;
      // window.location.href =
      //   result.login_page + '?appId=' + result.appId + '&redirect_uri=' + window.location.href;
      // window.location.href =
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: "warning",
        title: () => h("span", t("sys.app.logoutTip")),
        content: () => h("span", t("sys.app.logoutMessage")),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
