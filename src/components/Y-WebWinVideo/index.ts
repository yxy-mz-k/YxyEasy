import type { App, Plugin } from "vue";
import YWebWinVideo from "./index.vue";

YWebWinVideo.install = (app: App) => {
  app.component("YWebWinVideo", YWebWinVideo);
};

export default YWebWinVideo as typeof YWebWinVideo & Plugin;
