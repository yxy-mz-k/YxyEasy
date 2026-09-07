// export { default as CollapseTransition } from "./src/CollapseTransition.vue";

import { withInstall } from "utils/index";
import {
  createSimpleTransition,
  createJavascriptTransition,
} from "./src/CreateTransition";
import ExpandTransitionGenerator from "./src/ExpandTransition";
import collapseTransition from "./src/CollapseTransition.vue";
export const CollapseTransition = withInstall(collapseTransition);

export const FadeTransition = createSimpleTransition("fade-transition");
export const ScaleTransition = createSimpleTransition("scale-transition");
export const SlideYTransition = createSimpleTransition("slide-y-transition");
export const ScrollYTransition = createSimpleTransition("scroll-y-transition");
export const SlideYReverseTransition = createSimpleTransition(
  "slide-y-reverse-transition",
);
export const ScrollYReverseTransition = createSimpleTransition(
  "scroll-y-reverse-transition",
);
export const SlideXTransition = createSimpleTransition("slide-x-transition");
export const ScrollXTransition = createSimpleTransition("scroll-x-transition");
export const SlideXReverseTransition = createSimpleTransition(
  "slide-x-reverse-transition",
);
export const ScrollXReverseTransition = createSimpleTransition(
  "scroll-x-reverse-transition",
);
export const ScaleRotateTransition = createSimpleTransition(
  "scale-rotate-transition",
);
export const ExpandXTransition = createJavascriptTransition(
  "expand-x-transition",
  ExpandTransitionGenerator("", true),
);
export const ExpandTransition = createJavascriptTransition(
  "expand-transition",
  ExpandTransitionGenerator(""),
);

// 收集所有过渡组件
export const transitionComponents = [
  CollapseTransition,
  FadeTransition,
  ScaleTransition,
  SlideYTransition,
  ScrollYTransition,
  SlideYReverseTransition,
  ScrollYReverseTransition,
  SlideXTransition,
  ScrollXTransition,
  SlideXReverseTransition,
  ScrollXReverseTransition,
  ScaleRotateTransition,
  ExpandXTransition,
  ExpandTransition,
];
// 安装方法
const install = (app: any) => {
  transitionComponents.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};
export default {
  install,
  components: transitionComponents,
};
