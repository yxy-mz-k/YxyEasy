import type { App, Plugin } from "vue";
import YClipboard from "./index.vue";

YClipboard.install = (app: App) => {
  app.component("YClipboard", YClipboard);
};

export default YClipboard as typeof YClipboard & Plugin;
