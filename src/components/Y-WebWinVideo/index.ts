import type { App, Plugin } from "vue";
import WebWinVideo from "./index.vue";

WebWinVideo.install = (app: App) => {
  app.component("WebWinVideo", WebWinVideo);
};

export default WebWinVideo as typeof WebWinVideo & Plugin;
