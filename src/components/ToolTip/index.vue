<template>
  <a-tooltip>
    <template #title v-if="value">{{ title }}</template>
    <slot></slot>
  </a-tooltip>
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
} from "vue";
interface Props {
  title?: any;
  value?: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { title, value } = toRefs(props);
</script>
<style lang="scss" scoped></style>
