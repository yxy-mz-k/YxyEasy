<template>
  <div class="handle-fixed" v-loading="loading" :style="posiStyle">
    <Icon :icon="icon" @click="click" :size="size" />
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
} from "vue";
import { Icon } from "components/Icon";
const emits = defineEmits<{
  (e: "click", k?: any): void;
}>();
interface Props {
  loading?: boolean;
  icon?: string;
  size?: number;
  posiStyle?: any;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  icon: "fluent:save-24-regular",
  size: 20,
});
const { loading, icon, size, posiStyle } = toRefs(props);
const click = (e?: any) => {
  emits("click", e);
};
</script>
<style lang="scss" scoped>
.handle-fixed {
  position: fixed;
  right: 24px;
  top: 50%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0960bd;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10000;
}
</style>
