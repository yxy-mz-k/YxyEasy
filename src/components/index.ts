import Charts from "./Charts/index.vue";
import LeftProjectTree from "./LeftProjectTree/index.vue";
import PageLayout from "./PageLayout/index.vue";
import SortableList from "./SortableList/index.vue";
import ToolTip from "./ToolTip/index.vue";
// 按需引入
export { Charts, LeftProjectTree, PageLayout, SortableList, ToolTip };

const modules = import.meta.globEager("./*/index.vue");
const install = function (App: any) {
  Object.keys(modules)?.map((m: any) => {
    App.component(modules[m].default.name, modules[m].default);
  });
};

export default { install };
