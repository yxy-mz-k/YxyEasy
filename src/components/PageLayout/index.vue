<template>
  <div class="page-layout-index">
    <div class="page-layout-index-content">
      <div class="page-layout-index-content-tabs" v-if="tab || tab?.length">
        <a-tabs v-model:activeKey="tabActiveKey" @change="changeTab">
          <a-tab-pane
            v-for="item in tab"
            :key="item[item.keyProp || 'key']"
            :tab="item.tab"
            :disabled="item.disabled"
          />
          <template #leftExtra>
            <slot name="leftExtra"></slot>
          </template>
          <template #rightExtra>
            <slot name="rightExtra"></slot>
          </template>
        </a-tabs>
      </div>
      <div class="page-layout-index-content-content">
        <splitpanes
          class="default-theme"
          :class="{
            hiddenSplitter: !(($slots.left || tree || tree.length) && showLeft),
          }"
          :horizontal="false"
          :push-other-panes="true"
          :dbl-click-splitter="true"
          :rtl="false"
          :first-splitter="false"
          style="width: 100%; height: 100%"
          @resize="resize"
        >
          <pane
            :size="
              ($slots.left || tree || tree.length) && showLeft
                ? attrs?.leftSize ?? defaultSize
                : 0
            "
          >
            <div class="page-layout-index-content-content-tree">
              <slot name="left" v-if="$slots.left || tree || tree.length">
                <!-- <LeftProjectTree
                  v-bind="attrs"
                  ref="LeftProjectTreeRef"
                  :treeStyle="
                    attrs?.treeStyle
                      ? attrs?.treeStyle
                      : tab || tab?.length
                      ? 'height: calc(100vh - 315px)'
                      : 'height: calc(100vh - 255px)'
                  "
                  :treeData="tree"
                  :fieldNames="fieldNames"
                  :multiple="multiple"
                  :selectFirst="selectFirst"
                  :selectedKey="selectedKey"
                  :canEdit="canEdit"
                  @select="selectTree"
                  @getTree="getTree"
                  @addTree="addTree"
                  @editTree="editTree"
                  @deleteTree="deleteTree"
                >
                  <template v-for="(_, k) in slots" #[k]="slotProps">
                    <slot :name="k" v-bind="slotProps"></slot>
                  </template>
                </LeftProjectTree> -->
              </slot>
            </div>
          </pane>
          <pane
            :size="
              ($slots.left || tree || tree.length) && showLeft
                ? 100 - (attrs?.leftSize ?? defaultSize)
                : 100
            "
          >
            <div class="page-layout-index-content-content-detail">
              <slot></slot>
            </div>
          </pane>
        </splitpanes>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  computed,
  nextTick,
  onUnmounted,
  onBeforeUnmount,
  defineComponent,
  useAttrs,
  useSlots,
  watchEffect,
} from "vue";

defineOptions({ name: "PageLayout" });

const attrs: any = useAttrs();
const slots: any = useSlots();

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
const defaultSize = ref<any>(20);

// import LeftProjectTree from '/@/views/common/LeftProjectTree/index.vue';
const emit = defineEmits<{
  (e: "changeTab", k: any): void;
  (e: "selectTree", k?: any, v?: any, c?: any): void;
  (e: "getTree", k?: any): void;
  (e: "addTree", k?: any): void;
  (e: "editTree", k?: any): void;
  (e: "deleteTree", k?: any): void;
  (e: "resize", k?: any): void;
}>();
interface TAB {
  key: any;
  tab: any;
  sign: any;
  keyProp: any;
  [key: string]: any;
}
interface Props {
  tab?: TAB[] | boolean;
  activeKey?: any;
  tree?: any;
  fieldNames?: any;
  multiple?: boolean;
  selectFirst?: boolean;
  selectedKey?: any;
  isNeedConfirm?: boolean;
  canEdit?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  tab: false,
  tree: false,
  fieldNames: {
    children: "children",
    key: "id",
    title: "title",
    parentId: "parentId",
  },
  multiple: false,
  selectFirst: false,
  isNeedConfirm: false,
  canEdit: true,
});
const {
  tab,
  activeKey,
  tree,
  fieldNames,
  multiple,
  selectFirst,
  selectedKey,
  isNeedConfirm,
  canEdit,
} = toRefs(props);
// import getIndex from './components/hook/index';
const LeftProjectTreeRef = ref();
// const {
//   tabActiveKey,
//   changeTab,
//   // treeList,
//   selectTree,
//   getTree,
//   addTree,
//   editTree,
//   deleteTree,
//   closeTreeDia,
//   showLeft,
//   handleShrink,
//   handleUnfold,
// } = getIndex({
//   emit,
//   tab,
//   activeKey,
//   tree,
//   LeftProjectTreeRef,
//   isNeedConfirm,
// });

const tabActiveKey = ref("");
const historyKey = ref("");
const changeTab = (key: any) => {
  if (!historyKey.value) {
    historyKey.value = tab.value[0]?.[tab.value[0]?.keyProp || "key"];
  }
  const isNeedConfirmTab = historyKey.value
    ? tab.value?.find((k: any) => k[k.keyProp || "key"] === historyKey.value)
        ?.isNeedConfirm
    : false;
  if (isNeedConfirmTab) {
    Modal.confirm({
      title: "请问确认离开吗，离开后新修改内容会丢失，请在确认保存之后离开",
      content: h(
        "div",
        {
          style: {
            color: "red",
          },
        },
        "点击确定将离开，点击取消将留在本页面"
      ),
      centered: true,
      onOk() {
        historyKey.value = key;
        emit("changeTab", key);
        return;
      },
      onCancel() {
        tabActiveKey.value = historyKey.value;
        return;
      },
    });
  } else {
    historyKey.value = key;
    emit("changeTab", key);
  }
};
// const treeList = reactive<any>([]);
const selectTree = (key?: any, v?: any, c?: any) => {
  emit("selectTree", key, v, c);
};
const getTree = () => {
  emit("getTree");
};
const addTree = (key?: any) => {
  emit("addTree", key);
};
const editTree = (key?: any) => {
  emit("editTree", key);
};
const deleteTree = (key?: any) => {
  emit("deleteTree", key);
};
const closeTreeDia = () => {
  LeftProjectTreeRef.value?.closeModal();
};
const showLeft = ref(true);
const handleShrink = () => {
  showLeft.value = false;
};
const handleUnfold = () => {
  showLeft.value = true;
};
const resize = () => {
  emit("resize");
};

watchEffect(() => {
  if (activeKey.value) {
    tabActiveKey.value = activeKey.value;
  }

  // if (typeof tree.value === 'object') {
  //   treeList.length = 0;
  //   treeList.push(...(tree.value || []));
  // }
});
onMounted(() => {
  if (typeof tab.value === "object") {
    tabActiveKey.value = activeKey.value
      ? activeKey.value
      : tab.value[0]?.[tab.value[0]?.keyProp || "key"];
  } else {
    tabActiveKey.value = activeKey.value ? activeKey.value : "";
  }
  historyKey.value = tabActiveKey.value;
  // if (typeof tree.value === 'object') {
  //   treeList.length = 0;
  //   treeList.push(...(tree.value || []));
  // } else {
  //   treeList.length = 0;
  //   getProjectTreeList({}).then((res) => {
  //     treeList.push(res);
  //   });
  // }
});

defineExpose({
  closeTreeDia,
});

import { h } from "vue";
import { Modal } from "ant-design-vue";
import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
onBeforeRouteLeave((to, from, next) => {
  if (isNeedConfirm.value) {
    Modal.confirm({
      title: "请问确认离开吗，离开后新修改内容会丢失，请在确认保存之后离开",
      content: h(
        "div",
        {
          style: {
            color: "red",
          },
        },
        "点击确定将离开，点击取消将留在本页面"
      ),
      centered: true,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        next();
      },
      onCancel() {},
    });
  } else {
    next();
  }
});
</script>
<style lang="scss">
::-webkit-scrollbar,
::-webkit-scrollbar-corner {
  width: 5px;
  height: 5px;
  overflow: overlay;
  // display: none !important;
}
</style>
<style lang="scss" scoped>
@use "./index.scss";
</style>
