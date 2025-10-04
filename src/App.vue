<template>
  <div class="page-parent">
    <PageLayout
      :tab="tabList"
      @change-tab="changeTab"
      :tree="treeList"
      :fieldNames="{
        children: 'children',
        title: 'name',
        key: 'id',
        name: 'label',
      }"
    >
      <div class="page-parent-content autosize-content">SDS</div>
    </PageLayout>
  </div>
</template>
<script setup lang="ts">
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
import PageLayout from "components/PageLayout/index.vue";
const tabList = reactive<any>([
  {
    key: "hour",
    tab: "小时报",
  },
  {
    key: "day",
    tab: "日报",
  },
  {
    key: "week",
    tab: "周报",
  },
  {
    key: "month",
    tab: "月报",
  },
  {
    key: "quarter",
    tab: "季报",
  },
  {
    key: "year",
    tab: "年报",
  },
]);
const changeTab = (e: any) => {
  console.log("e :>> ", e);
};

const treeList = reactive<any>([
  {
    id: "1",
    name: "dsf",
    label: "dsf",
  },
]);
</script>
<style scoped></style>
