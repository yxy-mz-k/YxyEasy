<template>
  <div
    ref="customDialogRef"
    class="custom-dialog"
    :class="[
      {
        cursorMove: attrs?.canDraggle,
      },
    ]"
    :style="[attrs?.CustomDiaStyle, attrs?.canDraggle ? style : null]"
  >
    <div class="custom-dialog-pine" v-if="!attrs?.hiddenLine"></div>
    <div
      class="custom-dialog-content"
      :class="{
        'custom-dialog-content-hiddenheader': attrs?.hiddenHeader,
      }"
    >
      <div class="custom-dialog-content-header" v-if="!attrs?.hiddenHeader">
        <div class="custom-dialog-content-header-body">
          <slot name="header">
            <slot name="title">
              <div class="custom-dialog-content-header-body-title">
                {{ attrs?.title || "标题" }}
              </div>
            </slot>
            <slot name="title-replenish"></slot>
          </slot>
        </div>
        <div class="custom-dialog-content-header-icon">
          <slot name="icon">
            <slot name="icon-replenish"></slot>
            <slot name="icon-close">
              <!-- <div
                class="custom-dialog-content-header-icon-close iconfont icon-close"
                @click="close"
              ></div> -->
              <Icon icon="material-symbols:close" @click="close" />
            </slot>
          </slot>
        </div>
      </div>
      <div class="custom-dialog-content-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="componentName">
import {
  ref,
  shallowRef,
  toRefs,
  reactive,
  onMounted,
  onUnmounted,
  watch,
  computed,
  getCurrentInstance,
  nextTick,
  h,
  useAttrs,
  createApp,
} from "vue";
import { Icon } from "components/Icon";
const attrs: any = useAttrs();
const emits = defineEmits<{
  (e: "close", k?: any): void;
}>();
const close = () => {
  emits("close");
};

import { useDraggable } from "@vueuse/core";
const customDialogRef = ref();
const { x, y, style } = useDraggable(customDialogRef, {
  initialValue: {
    x: attrs?.CustomDiaStyle?.left?.replace("px", "")?.replace("%", "")
      ? Number(attrs?.CustomDiaStyle?.left?.replace("px", "")?.replace("%", ""))
      : 0,
    y: attrs?.CustomDiaStyle?.top?.replace("px", "")?.replace("%", "")
      ? Number(attrs?.CustomDiaStyle?.top?.replace("px", "")?.replace("%", ""))
      : 0,
  },
});
</script>
<style lang="scss" scoped>
@keyframes pine {
  0% {
    transform: rotateZ(135deg) scale(0);
  }

  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}
@keyframes body {
  0% {
    border: 1px solid transparent;
    background-color: transparent;
    box-shadow: 0 0 10px 2px transparent;
  }

  100% {
    border: 1px solid rgba(153, 212, 255, 0.5);
    background-color: rgba(0, 19, 48, 0.9);
    box-shadow: 0 0 10px 2px rgba(75, 139, 216, 1);
  }
}
@keyframes area {
  0% {
    width: 0%;
  }
  100% {
    width: calc(100% - 8px);
  }
}
@keyframes fontColor {
  0% {
    color: transparent;
    text-shadow: 1px 1px 5px transparent;
  }
  40% {
    color: transparent;
    text-shadow: 1px 1px 5px transparent;
  }
  100% {
    color: white;
    text-shadow: 1px 1px 5px rgba(75, 139, 216, 1);
  }
}
.custom-dialog {
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  &-pine {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
    pointer-events: none;
  }
  &-pine::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -15px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(153, 212, 255, 0.5);
    transform-origin: bottom center;
    transform: rotateZ(135deg) scale(1.5);
    filter: drop-shadow(1px 0 2px rgba(120, 183, 255, 1));
    animation: pine 0.5s;
  }
  &-content {
    flex: 1;
    height: 100%;
    border-radius: 24px 0 24px 0;
    border: 1px solid rgba(153, 212, 255, 0.5);
    background-color: rgba(0, 19, 48, 0.9);
    box-shadow: 0 0 10px 2px rgba(75, 139, 216, 1);
    padding: 70px 0 8px 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    position: relative;
    animation: body 2s;

    &-header {
      position: absolute;
      top: 8px;
      right: 0;
      width: calc(100% - 8px);
      display: flex;
      align-items: center;
      column-gap: 24px;
      justify-content: space-between;
      // width: 100%;
      height: 50px;
      padding: 4px 10px;
      box-sizing: border-box;
      background-image: linear-gradient(
        to left,
        rgba(47, 136, 218, 1),
        rgba(0, 19, 48, 0.9)
      );
      border-radius: 24px 0 0 0;
      pointer-events: auto;
      animation: area 1s;

      &-body {
        flex: 1;
        color: white;
        display: flex;
        align-items: center;
        // text-shadow: 1px 1px 5px #002520d2;
        text-shadow: 1px 1px 5px rgba(75, 139, 216, 1);
        animation: fontColor 1s;
      }
      &-icon {
        display: flex;
        align-items: center;
        column-gap: 8px;
        color: white;
        // text-shadow: 1px 1px 5px #002520d2;
        text-shadow: 1px 1px 5px rgba(75, 139, 216, 1);
        cursor: pointer;
        animation: fontColor 1s;
      }
    }
    &-body {
      flex: 1;
      width: 100%;
      overflow: auto;
      padding-right: 8px;
      box-sizing: border-box;
    }
  }
  &-content-hiddenheader {
    padding-top: 8px;
  }
}
</style>
