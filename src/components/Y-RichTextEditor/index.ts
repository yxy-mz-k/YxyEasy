import type { App, Plugin } from "vue";
import RichTextEditor from "./index.vue";

RichTextEditor.install = (app: App) => {
  app.component("RichTextEditor", RichTextEditor);
};

export default RichTextEditor as typeof RichTextEditor & Plugin;
