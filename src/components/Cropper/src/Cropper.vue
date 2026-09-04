<template>
  <div :class="getClass" :style="getWrapperStyle" class="cropper">
    <img
      v-show="isReady"
      ref="imgElRef"
      :src="attrs?.src"
      :alt="attrs?.alt"
      :crossorigin="attrs?.crossorigin"
      :style="getImageStyle"
    />
  </div>
  <div class="cropper-tools">
    <div>
      <slot name="preTool"></slot>
    </div>
    <Space>
      <Tooltip :title="t('component.cropper.btn_reset')" placement="bottom">
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('reset')"
        >
          <template #icon>
            <Icon icon="ant-design:reload-outlined" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip
        :title="t('component.cropper.btn_rotate_left')"
        placement="bottom"
      >
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('rotate', -45)"
        >
          <template #icon>
            <Icon icon="ant-design:rotate-left-outlined" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip
        :title="t('component.cropper.btn_rotate_right')"
        placement="bottom"
      >
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('rotate', 45)"
        >
          <template #icon>
            <Icon icon="ant-design:rotate-right-outlined" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip :title="t('component.cropper.btn_scale_x')" placement="bottom">
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('scaleX')"
        >
          <template #icon>
            <Icon icon="vaadin:arrows-long-h" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip :title="t('component.cropper.btn_scale_y')" placement="bottom">
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('scaleY')"
        >
          <template #icon>
            <Icon icon="vaadin:arrows-long-v" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip :title="t('component.cropper.btn_zoom_in')" placement="bottom">
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('zoom', 0.1)"
        >
          <template #icon>
            <Icon icon="ant-design:zoom-in-outlined" />
          </template>
        </a-button>
      </Tooltip>
      <Tooltip :title="t('component.cropper.btn_zoom_out')" placement="bottom">
        <a-button
          type="primary"
          size="small"
          :disabled="!attrs?.src"
          @click="handlerToolbar('zoom', -0.1)"
        >
          <template #icon>
            <Icon icon="ant-design:zoom-out-outlined" />
          </template>
        </a-button>
      </Tooltip>
    </Space>
  </div>
</template>
<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { onMounted, ref, unref, computed, onUnmounted, useAttrs } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { useDesign } from "hooks/web/useDesign";
import { useDebounceFn } from "@vueuse/core";
import { Space, Tooltip } from "ant-design-vue";
import { Icon } from "components/Icon";
import { useI18n } from "hooks/web/useI18n";
const { t } = useI18n();

type Options = Cropper.Options;

const defaultOptions: Options = {
  aspectRatio: NaN,
  viewMode: 1,
  autoCropArea: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
};

defineOptions({ name: "CropperImage" });

const props = defineProps({
  // src: { type: String, required: true },
  // alt: { type: String },
  // circled: { type: Boolean, default: false },
  realTimePreview: { type: Boolean, default: true },
  // height: { type: [String, Number], default: '360px' },
  // crossorigin: {
  //   type: String as PropType<'' | 'anonymous' | 'use-credentials' | undefined>,
  //   default: undefined,
  // },
  // imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  // options: { type: Object as PropType<Options>, default: () => ({}) },
});

const attrs: any = useAttrs();
const emits = defineEmits<{
  (e: "ready", k?: any): void;
  (e: "cropend", k?: any): void;
  (e: "cropendError"): void;
}>();

const imgElRef = ref<ElRef<HTMLImageElement>>();
const cropper = ref<Nullable<Cropper>>();
const isReady = ref(false);

const { prefixCls } = useDesign("cropper-image");

const getImageStyle = computed((): CSSProperties => {
  return {
    height: attrs?.height ?? "360px",
    maxWidth: "100%",
    ...(attrs.imageStyle ?? {}),
  };
});

const getClass = computed(() => {
  return [
    prefixCls,
    attrs.class,
    {
      [`${prefixCls}--circled`]: attrs?.circled,
    },
  ];
});

const getWrapperStyle = computed((): CSSProperties => {
  return { height: `${attrs?.height ?? "360px"}`.replace(/px/, "") + "px" };
});

onMounted(() => {
  init();
});

onUnmounted(() => {
  cropper.value?.destroy();
});

const init = async () => {
  const imgEl = unref(imgElRef);
  if (!imgEl) {
    return;
  }
  cropper.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      isReady.value = true;
      realTimeCroppered();
      emits("ready", cropper.value);
    },
    crop() {
      debounceRealTimeCroppered();
    },
    zoom() {
      debounceRealTimeCroppered();
    },
    cropmove() {
      debounceRealTimeCroppered();
    },
    ...(attrs?.options ?? {}),
  });
};

// Real-time display preview
const realTimeCroppered = () => {
  props.realTimePreview && croppered();
};

// event: return base64 and width and height information after cropping
const croppered = () => {
  if (!cropper.value) {
    return;
  }
  let imgInfo = cropper.value.getData();
  const canvas = attrs.circled
    ? getRoundedCanvas()
    : cropper.value.getCroppedCanvas();
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = (e) => {
      emits("cropend", {
        imgBase64: e.target?.result ?? "",
        imgInfo,
        blob,
      });
    };
    fileReader.onerror = () => {
      emits("cropendError");
    };
  }, "image/png");
};

// Get a circular picture canvas
const getRoundedCanvas = () => {
  const sourceCanvas = cropper.value!.getCroppedCanvas();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true,
  );
  context.fill();
  return canvas;
};

let scaleX = 1;
let scaleY = 1;
const handlerToolbar = (event: string, arg?: number) => {
  if (event === "scaleX") {
    scaleX = arg = scaleX === -1 ? 1 : -1;
  }
  if (event === "scaleY") {
    scaleY = arg = scaleY === -1 ? 1 : -1;
  }
  cropper?.value?.[event]?.(arg);
};
const debounceRealTimeCroppered = useDebounceFn(realTimeCroppered, 80);
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-cropper-image";

.@{prefix-cls} {
  &--circled {
    .cropper-view-box,
    .cropper-face {
      border-radius: 50%;
    }
  }
}

.cropper-tools {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
