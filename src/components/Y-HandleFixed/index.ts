import type { App, Plugin } from "vue";
import YHandleFixed from "./index.vue";

YHandleFixed.install = (app: App) => {
  app.component("YHandleFixed", YHandleFixed);
};

export default YHandleFixed as typeof YHandleFixed & Plugin;
