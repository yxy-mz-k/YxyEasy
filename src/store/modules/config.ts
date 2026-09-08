import { defineStore } from "pinia";

export const useConfigStore = defineStore({
  id: "EASYCONFIG",
  state: () => ({
    key: <any>"",
    project: <any>"",
    appId: <any>"",
    suffixApi: <any>"",
    name: <any>"",
    VITE_GLOB_APP_SHORT_NAME: "vue_vben_admin",
  }),
  getters: {},
  actions: {
    setConfig(options: any) {
      this.key = options?.key;
      this.project = `/${options?.key}/`;
      this.appId = `app_${options?.key}`;
      this.suffixApi = `/${options?.key}`;
      this.name = options?.name;
      this.VITE_GLOB_APP_SHORT_NAME =
        options?.VITE_GLOB_APP_SHORT_NAME ?? "vue_vben_admin";
    },
    getConfig() {
      return {
        key: this.key,
        project: this.project,
        appId: this.appId,
        suffixApi: this.suffixApi,
        name: this.name,
        VITE_GLOB_APP_SHORT_NAME: this.VITE_GLOB_APP_SHORT_NAME,
      };
    },
  },
});
