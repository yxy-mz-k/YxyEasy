import { defineStore } from "pinia";

export const useConfigStore = defineStore("EASYCONFIG", {
  state: () => {
    return {
      key: <any>"",
      project: <any>"",
      appId: <any>"",
      suffixApi: <any>"",
    };
  },
  // 类似 computed
  getters: {},
  // 类似 methods 可以做同步 异步 用来提交 state
  actions: {
    setConfig(options: any) {
      this.key = options?.key;
      this.project = `/${options?.key}/`;
      this.appId = `app_${options?.key}`;
      this.suffixApi = `/${options?.key}`;
    },
    getConfig() {
      return {
        key: this.key,
        project: this.project,
        appId: this.appId,
        suffixApi: this.suffixApi,
      };
    },
  },
});
