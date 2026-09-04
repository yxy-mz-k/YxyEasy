import type { App, Plugin } from "vue";
import YSortableList from "./index.vue";

YSortableList.install = (app: App) => {
  app.component("YSortableList", YSortableList);
};

export default YSortableList as typeof YSortableList & Plugin;
