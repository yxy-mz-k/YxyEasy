<template>
  <div class="Splitpanes">
    <splitpanes
      class="default-theme"
      :class="['default-theme', attrs?.class]"
      :horizontal="attrs?.horizontal ?? false"
      :push-other-panes="true"
      :dbl-click-splitter="true"
      :rtl="false"
      :first-splitter="false"
      style="width: 100%; height: 100%"
      @resize="resize"
    >
      <pane :size="slots.left ? attrs?.size ?? defaultSize : 0" v-if="slots.left">
        <div class="Splitpanes-left">
          <slot name="left"> </slot>
        </div>
      </pane>
      <pane :size="$slots.left ? 100 - (attrs?.size ?? defaultSize) : 100">
        <div class="Splitpanes-right">
          <slot></slot>
        </div>
      </pane>
    </splitpanes>
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
    useSlots,
    watchEffect,
  } from 'vue';
  const attrs: any = useAttrs();
  const slots: any = useSlots();
  const emit = defineEmits<{
    (e: 'resize', k?: any): void;
  }>();
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  const defaultSize = ref<any>(20);

  const resize = () => {
    emit('resize');
  };
</script>
<style lang="scss" scoped>
  .Splitpanes {
    width: 100%;
    height: 100%;
    &-left,
    &-right {
      width: 100%;
      height: 100%;
    }
    :deep(.default-theme) {
      .splitpanes__splitter {
        // background-color: #f0f2f5;
        background-color: unset;
      }
      .splitpanes__splitter::before {
        background-color: #2a7dc9;
      }
      .splitpanes__splitter::after {
        background-color: #2a7dc9;
      }
    }
    :deep(.hiddenSplitter) {
      .splitpanes__splitter {
        display: none;
      }
    }
  }
</style>
