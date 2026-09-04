import { defineStore } from "pinia";
export const useConfigManagetore = defineStore({
  id: "app-configManage",
  state: () => ({
    // 所有的组件对应的图片
    id: <any>"",
    record: new Map(),
    zjImg: new Map(),
    currentTimekey: "",
    // 从列表拖入画布的item
    currentItem: new Map(),
    // 画布属性
    // canvasProps: {
    //   width: '',
    //   height: '',
    //   backgroundColor: '',
    //   backgroundImage: '',
    // },
    canvasProps: new Map(),
    // 选中的组件对应的属性集合
    // currentZj:new Map(),
    // 当前选中的组件属性
    currentZjProp: <any>{
      public: {},
      event: new Map(),
      data: new Map(),
      conditions: new Map(),
    },
    // 组件对应的属性集合
    zjProps: new Map(),
    // 画布上的所有的组件属性集合
    canvasZjProps: new Map(),
    // 选择的设备和因子
    deviceKeys: {
      device: <any>[],
      factor: new Map(),
      keys: new Map(),
    },
    components: new Map(),
    isFirst: true,
    isDel: false,
    canRespond: true,
  }),
  getters: {},
  actions: {
    clear() {
      this.id = "";
      this.record.clear();
      this.zjImg.clear();
      this.currentTimekey = "";
      this.currentItem.clear();
      // this.canvasProps = {
      //   width: '',
      //   height: '',
      //   backgroundColor: '',
      //   backgroundImage: '',
      // };
      this.canvasProps.clear();
      this.currentZjProp.public = {};
      this.currentZjProp.event.clear();
      this.currentZjProp.data.clear();
      this.currentZjProp.conditions.clear();
      this.currentZjProp = {
        public: {},
        event: new Map(),
        data: new Map(),
        conditions: new Map(),
      };
      this.zjProps.clear();
      this.canvasZjProps.clear();
      this.deviceKeys.device = [];
      this.deviceKeys.factor.clear();
      this.deviceKeys.keys.clear();
      this.deviceKeys = {
        device: [],
        factor: new Map(),
        keys: new Map(),
      };
      this.components.clear();
      this.isFirst = true;
      this.isDel = false;
      this.canRespond = true;
    },
  },
});
