import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Antd from "ant-design-vue";
// import("ant-design-vue/dist/antd.less");

import VuePlus from "./components/index"; //导入

const app = createApp(App);
app.use(ElementPlus).use(Antd).use(VuePlus).mount("#app");
