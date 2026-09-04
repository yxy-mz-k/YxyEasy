<template>
  <div class="clip-board">
    <slot>
      <div
        @click="copy"
        class="clip-board-text"
        :class="[attrs?.ellipsis ?? true ? 'clip-board-ellipsis' : '']"
        :style="getStyle()"
      >
        {{ attrs?.content }}
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts" name="componentName">
import {
  ref,
  shallowRef,
  toRefs,
  reactive,
  onMounted,
  watch,
  computed,
  getCurrentInstance,
  nextTick,
  useAttrs,
} from "vue";
const attrs: any = useAttrs();

import { useMessage } from "hooks/useMessage";
const { createMessage } = useMessage();

import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
const copy = async () => {
  try {
    await toClipboard(attrs?.content);
    createMessage.success("已复制成功到剪切板");
  } catch (e) {}
};

const getStyle = () => {
  return {
    color: attrs?.color ?? "rgba(0,0,0,0.9)",
  };
};
</script>
<style lang="scss" scoped>
.clip-board {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  .clip-board-text {
    word-break: break-all;
  }
  .clip-board-ellipsis {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
