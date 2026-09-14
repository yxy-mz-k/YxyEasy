import type { App, Plugin } from "vue";
import VideoCom from "./index.vue";

VideoCom.install = (app: App) => {
  app.component("VideoCom", VideoCom);
};

export default VideoCom as typeof VideoCom & Plugin;
