import { defineStore } from "pinia";
import cacheUtils from "utils/cacheUtil";

export const useThemeStore = defineStore("THEME", {
  state: () => {
    return {
      themeMode: cacheUtils.get("theme_mode") || "technologyBlue",
    };
  },
  // 类似 computed
  getters: {},
  // 类似 methods 可以做同步 异步 用来提交 state
  actions: {},
});
