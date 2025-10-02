<template>
  <div class="sortable-scroll" ref="sortRef">
    <slot :items="list"></slot>
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
} from "vue";
defineOptions({ name: "SortableList" });
const attrs: any = useAttrs();
const sortRef = ref();
import Sortable from "sortablejs";
const list = ref<any>([]);

const emits = defineEmits<{
  (e: "change", k: any, v: any, nindex?: any, oindex?: any);
}>();

watch(
  () => attrs?.data,
  (n: any) => {
    list.value = [];
    list.value = [...n];
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(() => {
  list.value = [...attrs?.data];
  const sortable = new Sortable(sortRef.value, {
    animation: 150,
    ghostClass: "sortable-ghost",
    onEnd: (evt: any) => {
      const newItems = [...list.value];
      const [movedItem] = newItems.splice(evt.oldIndex, 1);
      newItems.splice(evt.newIndex, 0, movedItem);
      list.value = newItems;

      const row = attrs?.data?.[evt.oldIndex];
      // const rowContent = JSON.parse(row.content);
      // rowContent.sort = evt.newIndex + 1;
      // row.content = JSON.stringify(rowContent);
      row.sort = evt.newIndex + 1;

      const newRow = attrs?.data?.[evt.newIndex];
      // const newRowContent = JSON.parse(newRow.content);
      // newRowContent.sort = evt.oldIndex + 1;
      // newRow.content = JSON.stringify(newRowContent);
      newRow.sort = evt.oldIndex + 1;
      emits("change", row, newRow, evt?.newIndex, evt?.oldIndex);
    },
  });
});
</script>
<style lang="scss" scoped>
.sortable-scroll {
  all: inherit;
}
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
