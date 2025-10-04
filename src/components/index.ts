import PageLayout from "./PageLayout/index.vue";
import SortableList from "./SortableList/index.vue";
import Charts from "./Charts/index.vue";
// 按需引入
export { PageLayout, SortableList, Charts };

const component = [PageLayout, SortableList, Charts];

const install = function (App: any) {
  component.forEach((item) => {
    App.component(item.name, item);
  });
};

export default { install };
