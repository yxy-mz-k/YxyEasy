<template>
  <div
    :class="`${prefixCls}-div`"
    :style="{
      position: position,
      'z-index': zIndex,
      'margin-left': marginLeft,
      'margin-top': marginTop,
    }"
  >
    <!--      <a-tooltip >
            <template #title>prompt text</template>
          </a-tooltip>-->
    <div
      style="background: #ffffff; border: 1px solid red; border-radius: 10px"
      v-show="visible"
    >
      <JsonPreview :data="pText" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted,
  unref,
  nextTick,
  watchEffect,
  reactive,
  toRefs,
  h,
} from "vue";
import { Divider, Tooltip } from "ant-design-vue";
import { Icon } from "components/Icon";
import { useFlowChartContext } from "./useFlowContext";
import { JsonPreview } from "components/CodeEditor";

export default defineComponent({
  name: "FlowChartTooltip",
  components: { Icon, Divider, Tooltip, JsonPreview },
  props: {
    prefixCls: String,
  },
  emits: ["view-data"],
  setup(_, { emit }) {
    const style = reactive({
      visible: false,
      position: "absolute",
      zIndex: "99999!important",
      marginLeft: "600px",
      marginTop: "320px",
    });
    const pText = ref("");
    //"position:absolute;z-index: 99999!important; margin-left: 600px;margin-top: 320px"
    const { logicFlow } = useFlowChartContext();
    const onControl = (item) => {
      const lf = unref(logicFlow);
      if (!lf) {
        return;
      }
    };

    function handlerMouEnt({ data }) {
      const nodeMode = unref(logicFlow).getNodeModelById(data.id);
      if (data.type === "diamond") {
        var jsonVal = JSON.parse(JSON.stringify(data.properties));
        if (typeof jsonVal === "string") {
          jsonVal = JSON.parse(jsonVal);
        }
        if (data.properties) {
          delete jsonVal.fv;
        }
        pText.value = jsonVal;
      } else {
        var jsonVal = JSON.parse(JSON.stringify(data.properties));
        if (typeof jsonVal === "string") {
          jsonVal = JSON.parse(jsonVal);
        }
        pText.value = jsonVal;
      }
      if (data.type === "start" || data.type === "end") {
        style.visible = false;
      } else {
        if (data.type === "rect") {
          if (data.properties.modId) {
            style.visible = true;
          } else {
            style.visible = false;
          }
        } else {
          style.visible = true;
        }
      }
      style.marginLeft =
        (nodeMode.rx ? nodeMode.rx : nodeMode.width) / 2 + data.x + "px";
      style.marginTop =
        (nodeMode.ry ? nodeMode.ry : nodeMode.height) / 2 + data.y + "px";
    }

    function handlerMouLea({ data }) {
      (style.visible = false), (style.marginLeft = 0 + "px");
      style.marginTop = 0 + "px";
    }

    watchEffect(async () => {
      if (unref(logicFlow)) {
        await nextTick();
        unref(logicFlow)?.on("node:mouseenter", handlerMouEnt);
        unref(logicFlow)?.on("node:mouseleave", handlerMouLea);
      }
    });

    onUnmounted(() => {
      //unref(logicFlow)?.off('node:mouseenter', handlerData);
    });
    return { onControl, ...toRefs(style), pText };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-flow-chart-toolbar";

html[data-theme="dark"] {
  .lf-dnd {
    background: #080808;
  }
}

.@{prefix-cls} {
  height: 36px;
  background-color: @app-content-background;
  border-bottom: 1px solid @border-color-base;

  .disabeld {
    color: @disabled-color;
  }

  &__icon {
    display: inline-block;
    padding: 2px 4px;
    margin-right: 10px;

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
