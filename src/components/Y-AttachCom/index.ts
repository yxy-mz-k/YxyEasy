import type { App, Plugin } from "vue";
import AttachCom from "./index.vue";

AttachCom.install = (app: App) => {
  app.component("AttachCom", AttachCom);
};

export default AttachCom as typeof AttachCom & Plugin;
