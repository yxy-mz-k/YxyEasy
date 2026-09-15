<template>
  <BasicDrawer
    @register="register"
    v-bind="$attrs"
    :showFooter="false"
    destroyOnClose
    width="calc(100% - 210px)"
    title="预览"
    :scrollWrapperNoPadding="true"
    @close="handleCancel"
  >
    <div class="modal-drawer" v-if="show">
      <View ref="MtPreviewRef" v-bind="propData" />
    </div>
  </BasicDrawer>
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
    onBeforeUnmount,
  } from 'vue';
  import View from './view.vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  const propData = ref<any>({});
  const [register, { closeDrawer, changeOkLoading }] = useDrawerInner(async (data: any) => {
    propData.value = data;
    show.value = true;
  });

  const show = ref(false);
  const handleCancel = () => {
    show.value = false;
    closeDrawer();
  };

  const MtPreviewRef = ref();

  onMounted(() => {});
</script>
<style lang="scss" scoped>
  .modal-drawer {
    width: 100%;
    height: 100%;
    :deep(.page-layout-index) {
      padding: 0;
    }
  }
</style>
