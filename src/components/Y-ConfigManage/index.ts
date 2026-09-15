import type { App, Plugin } from "vue";
import ConfigManage from "./index.vue";

ConfigManage.install = (app: App) => {
  app.component("ConfigManage", ConfigManage);
};

export default ConfigManage as typeof ConfigManage & Plugin;
