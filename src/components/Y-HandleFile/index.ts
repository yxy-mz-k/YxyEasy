import type { App, Plugin } from "vue";
import HandleFile from "./index.vue";

HandleFile.install = (app: App) => {
  app.component("HandleFile", HandleFile);
};

export default HandleFile as typeof HandleFile & Plugin;
