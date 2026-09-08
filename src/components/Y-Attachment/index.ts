import type { App, Plugin } from "vue";
import YAttachCom from "./index.vue";

YAttachCom.install = (app: App) => {
  app.component("YAttachCom", YAttachCom);
};

export default YAttachCom as typeof YAttachCom & Plugin;
