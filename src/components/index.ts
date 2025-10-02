import PageLayout from "./PageLayout/index.vue";
import SortableList from "./SortableList/index.vue";
// 按需引入
export { PageLayout, SortableList };

const component = [PageLayout, SortableList];

const install = function (App: any) {
  component.forEach((item) => {
    App.component(item.name, item);
  });
};

export default { install };
