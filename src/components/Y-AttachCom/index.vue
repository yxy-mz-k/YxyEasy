<template>
  <!-- 视频弹窗 -->
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :centered="true"
    :destroyOnClose="true"
    :width="900"
    :footer="null"
    @cancel="closeDia"
    :getContainer="propData?.getContainer ?? getContainer"
  >
    <template #title>
      <div class="attach-com-title">{{ title }}</div>
    </template>
    <WebWinVideo :codeList="codeList" ref="WebWinVideoRef" v-if="isVideo" />
    <iframe
      :src="src"
      :frameborder="0"
      scrolling="auto"
      width="100%"
      height="100%"
      style="min-height: 600px"
      v-else
    ></iframe>
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
import { BasicModal, useModalInner } from "components/Modal";
import Mitt from "utils/myMitt";
import WebWinVideo from "components/Y-WebWinVideo/index.vue";
const propData = ref<any>({});
const title = ref("");
const src = ref("");
const codeList = reactive<any>([]);
const isVideo = ref(false);
const getContainer = () => document.body;
const [register, { closeModal }] = useModalInner((data: any) => {
  propData.value = data;

  title.value = data?.title || "";
  src.value = data?.src || "";
  codeList.length = 0;
  codeList.push(...(data?.codeList || []));
  isVideo.value = data?.isVideo;
});

const closeDia = () => {
  // visible.value = false;
  closeModal();
  Mitt.emit("diaLogClose");
};

// watch(propData, (n: any) => {
//   title.value = n?.title || '';
//   src.value = n?.src || '';
//   codeList.length = 0;
//   codeList.push(...(n?.codeList || []));
//   isVideo.value = n?.isVideo;
// });
onBeforeUnmount(() => {
  Mitt.off("diaLogClose");
});
</script>
<style lang="scss">
.my-video-modal {
  .ant-modal {
    .ant-modal-content {
      width: 100%;
      height: 100%;
      .ant-modal-header,
      .ant-modal-body {
        background-color: #3d3d3d;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@use "./index.scss";
</style>
