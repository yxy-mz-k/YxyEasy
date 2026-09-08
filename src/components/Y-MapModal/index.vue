<template>
  <!-- 地图弹窗 -->
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :footer="null"
    :centered="false"
    width="70%"
    :destroyOnClose="true"
    :zIndex="100000"
    title="地图"
    @cancel="handleCancel"
  >
    <div :style="mapStyle" v-if="show">
      <LeafletMap
        v-bind="propData"
        :iframeSrc="iframeSrc"
        :origin="origin"
        @close="handleCancel"
        @success="handleSuccess"
        @getMarkAddress="getMarkAddress"
      />
    </div>
  </BasicModal>
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
import LeafletMap from "components/Y-LeafletMap/index.vue";
import { BasicModal, useModalInner } from "components/Modal";
import { globalConfig } from "utils/global.js";
const propData = ref<any>({});
const show = ref(false);
const origin = globalConfig?.VITE_ORIGIN;

const [register, { closeModal }] = useModalInner((data: any) => {
  propData.value = data;
  show.value = true;
  iframeSrc.value = `${origin}/cfg/#/map`;
});
const emits = defineEmits<{
  (e: "success", k?: any, v?: any): void;
  (e: "getMarkAddress", k?: any, v?: any): void;
}>();

const iframeSrc = ref();
const handleCancel = () => {
  iframeSrc.value = "";
  show.value = false;
  closeModal();
};

const handleSuccess = (...args: any) => {
  emits("success", ...args);
};
const getMarkAddress = (...args: any) => {
  emits("getMarkAddress", ...args);
};

const mapStyle = ref<any>({
  width: "100%",
  height: "100%",
});
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
