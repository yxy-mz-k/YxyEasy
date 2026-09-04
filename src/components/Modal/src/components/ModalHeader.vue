<template>
  <BasicTitle
    :helpMessage="helpMessage"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mousemove="mousemove"
  >
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { PropType } from "vue";
import { BasicTitle } from "components/Basic";

defineOptions({ name: "BasicModalHeader" });

defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  title: { type: String },
});
const emit = defineEmits(["mousedown", "mousemove", "mouseup"]);

const isDrag = ref(false);
const mousedown = () => {
  isDrag.value = true;
  emit("mousedown");
};
const mouseup = () => {
  isDrag.value = false;
  emit("mouseup");
};

const mousemove = () => {
  if (!isDrag.value) {
    return;
  }
  emit("mousemove");
};
</script>
