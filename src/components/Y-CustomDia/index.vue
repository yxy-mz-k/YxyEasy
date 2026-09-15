<template>
  <Teleport to="body" :disabled="!attrs?.appendToBody">
    <div :id="id" v-if="visible"></div>
  </Teleport>
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
    createApp,
  } from 'vue';
  import ElementPlus from 'element-plus';
  import Antd from 'ant-design-vue';
  const attrs = useAttrs();
  const slots = useSlots();

  const visible = ref(false);

  import DIANODE from './DIANODE.vue';

  const currentVNode = ref();
  const emits = defineEmits<{
    (e: 'close', k?: any): void;
  }>();
  const close = () => {
    visible.value = false;
    id.value = null;
    currentVNode.value?.unmount(); // 调用unmount方法销毁组件
    emits('close');
  };

  const timeId = ref();
  const id = ref<any>('');
  const open = () => {
    id.value = attrs?.id ? attrs?.id : `YDIA-${new Date().getTime()}`;
    visible.value = true;
    timeId.value ? cancelAnimationFrame(timeId.value) : null;
    timeId.value = requestAnimationFrame(create);
  };

  const create = () => {
    const CDom: any = document.getElementById(id.value);
    if (currentVNode.value) {
      const firstDom = CDom.querySelector('div');
      currentVNode.value ? currentVNode.value?.unmount() : null;
      currentVNode.value = null;
      firstDom?.remove();
    }
    const dom = document.createElement('div');
    currentVNode.value = createApp({
      render: () =>
        h(
          DIANODE,
          {
            ...attrs,
            onClose: close,
          },
          slots,
        ),
    });
    currentVNode.value.use(ElementPlus).use(Antd).mount(dom);
    CDom.appendChild(dom);
  };
  defineExpose({
    open,
    close,
  });

  onMounted(() => {
    if (attrs?.alwaysShow) {
      open();
    }
  });
</script>
<style lang="scss" scoped>
  div[id^='YDIA-'] {
    pointer-events: auto;
  }
</style>
