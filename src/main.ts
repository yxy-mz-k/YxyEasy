import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/index.scss";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import VuePlus from "./components/index"; //导入

const app = createApp(App);
app.use(ElementPlus).use(Antd).use(VuePlus).mount("#app");
