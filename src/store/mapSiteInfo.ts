import { defineStore } from "pinia";

export const useMapSiteStore = defineStore("MAPSITE", {
  state: () => {
    return {
      currentMapInfo: <any>{},
      currentMapStyle: <any>{},
    };
  },
  // 类似 computed
  getters: {},
  // 类似 methods 可以做同步 异步 用来提交 state
  actions: {},
});
