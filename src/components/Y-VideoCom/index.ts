import type { App, Plugin } from "vue";
import YVideoCom from "./index.vue";

YVideoCom.install = (app: App) => {
  app.component("YVideoCom", YVideoCom);
};

export default YVideoCom as typeof YVideoCom & Plugin;
