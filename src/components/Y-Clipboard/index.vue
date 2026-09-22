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
import { useAttrs } from "vue";
import { useMessage } from "hooks/web/useMessage";
import { toClipboard } from "utils/other";

const attrs: any = useAttrs();
const { createMessage } = useMessage();

const copy = async () => {
  toClipboard(attrs?.content);
  // const text = attrs?.content ?? "";
  // try {
  //   if (navigator.clipboard) {
  //     await navigator.clipboard.writeText(text);
  //   } else {
  //     // 降级：兼容非 HTTPS 或旧浏览器
  //     const textarea = document.createElement("textarea");
  //     textarea.value = text;
  //     textarea.style.position = "fixed";
  //     textarea.style.opacity = "0";
  //     document.body.appendChild(textarea);
  //     textarea.select();
  //     document.execCommand("copy");
  //     document.body.removeChild(textarea);
  //   }
  //   createMessage.success("已复制成功到剪切板");
  // } catch (e) {
  //   createMessage.error("复制失败");
  // }
};

const getStyle = () => {
  return {
    color: attrs?.color ?? "rgba(0,0,0,0.9)",
  };
};
</script>
