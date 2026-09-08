import type { App, Plugin } from "vue";
import YHandleFile from "./index.vue";

YHandleFile.install = (app: App) => {
  app.component("YHandleFile", YHandleFile);
};

export default YHandleFile as typeof YHandleFile & Plugin;
