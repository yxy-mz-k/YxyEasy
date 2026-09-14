import type { App, Plugin } from "vue";
import SortableList from "./index.vue";

SortableList.install = (app: App) => {
  app.component("SortableList", SortableList);
};

export default SortableList as typeof SortableList & Plugin;
