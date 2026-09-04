<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="t('component.cropper.modalTitle')"
    width="800px"
    :canFullscreen="false"
    centered
    destroyOnClose
    @ok="handleOk"
    @cancel="handleCancel"
    :okText="t('component.cropper.okText')"
  >
    <div :class="prefixCls">
      <div :class="`${prefixCls}-left`">
        <div :class="`${prefixCls}-cropper`">
          <CropperImage
            v-bind="propsData"
            v-if="src"
            :src="src"
            height="300px"
            :circled="propsData?.circled ?? true"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>

        <div :class="`${prefixCls}-toolbar`">
          <Upload
            :fileList="[]"
            accept="image/*"
            :beforeUpload="handleBeforeUpload"
          >
            <Tooltip
              :title="t('component.cropper.selectImage')"
              placement="bottom"
            >
              <a-button size="small" type="primary">
                <template #icon>
                  <UploadOutlined />
                </template>
              </a-button>
            </Tooltip>
          </Upload>
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <div
          :class="[
            `${prefixCls}-preview`,
            {
              [`${prefixCls}-preview-circle`]: propsData?.circled ?? true,
            },
          ]"
        >
          <img
            :src="previewSource"
            v-if="previewSource"
            :alt="t('component.cropper.preview')"
          />
        </div>
        <template v-if="previewSource && (propsData?.circled ?? true)">
          <div :class="`${prefixCls}-group`">
            <Avatar :src="previewSource" size="large" />
            <Avatar :src="previewSource" :size="48" />
            <Avatar :src="previewSource" :size="64" />
            <Avatar :src="previewSource" :size="80" />
          </div>
        </template>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import type { CropendResult, Cropper } from "./typing";

import { ref, PropType } from "vue";
import CropperImage from "./Cropper.vue";
import { Space, Upload, Avatar, Tooltip } from "ant-design-vue";
import { useDesign } from "hooks/web/useDesign";
import { BasicModal, useModalInner } from "components/Modal";
import { dataURLtoBlob } from "utils/file/base64Conver";
import { isFunction } from "utils/is";
import { useI18n } from "hooks/web/useI18n";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();

type apiFunParams = { file: Blob; name: string; filename: string };

defineOptions({ name: "CropperModal" });

const props = defineProps({
  circled: { type: Boolean, default: true },
  uploadApi: {
    type: Function as PropType<(params: apiFunParams) => Promise<any>>,
  },
  src: { type: String },
  size: { type: Number },
});

const emit = defineEmits(["uploadSuccess", "uploadError", "register"]);

let filename = ref("");
const src = ref(props.src || "");
const previewSource = ref("");
const cropper = ref<Cropper>();
let scaleX = 1;
let scaleY = 1;

const { prefixCls } = useDesign("cropper-am");
const propsData = ref<any>(null);
const [register, { closeModal, setModalProps }] = useModalInner((data: any) => {
  propsData.value = data;
});
const { t } = useI18n();

// Block upload
const handleBeforeUpload = (file: File) => {
  if (props.size && file.size > 1024 * 1024 * props.size) {
    emit("uploadError", { msg: t("component.cropper.imageTooBig") });
    return false;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  src.value = "";
  previewSource.value = "";
  reader.onload = function (e) {
    src.value = (e.target?.result as string) ?? "";
    filename.value = file.name;
  };
  return false;
};

const handleCropend = ({ imgBase64 }: CropendResult) => {
  previewSource.value = imgBase64;
};

const handleReady = (cropperInstance: Cropper) => {
  cropper.value = cropperInstance;
};

const handlerToolbar = (event: string, arg?: number) => {
  if (event === "scaleX") {
    scaleX = arg = scaleX === -1 ? 1 : -1;
  }
  if (event === "scaleY") {
    scaleY = arg = scaleY === -1 ? 1 : -1;
  }
  cropper?.value?.[event]?.(arg);
};

const handleCancel = () => {
  src.value = "";
  previewSource.value = "";
  closeModal();
};
const handleOk = async () => {
  if (propsData.value?.uploadApi && isFunction(propsData.value?.uploadApi)) {
    if (!previewSource.value) {
      createMessage.warn("请先上传图片");
      return;
    }
    if (propsData.value?.DirectlyFile) {
      emit("uploadSuccess", {
        source: previewSource.value,
        data: previewSource.value,
      });
      handleCancel();
    } else {
      const blob: any = dataURLtoBlob(previewSource.value);
      try {
        setModalProps({ confirmLoading: true });
        blob.name = filename.value;
        const result = await propsData.value?.uploadApi({
          name: "file",
          file: blob,
          filename: filename.value,
        });
        emit("uploadSuccess", {
          source: previewSource.value,
          data: result.data,
        });
        handleCancel();
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }
  }
};
</script>

<style lang="less">
@prefix-cls: ~"@{namespace}-cropper-am";

.@{prefix-cls} {
  width: 100%;
  height: 100%;

  display: flex;

  &-left,
  &-right {
    height: 100%;
  }

  &-left {
    width: 55%;
  }

  &-right {
    width: 45%;
  }

  &-cropper {
    height: 300px;
    background: #eee;
    background-image: linear-gradient(
        45deg,
        rgb(0 0 0 / 25%) 25%,
        transparent 0,
        transparent 75%,
        rgb(0 0 0 / 25%) 0
      ),
      linear-gradient(
        45deg,
        rgb(0 0 0 / 25%) 25%,
        transparent 0,
        transparent 75%,
        rgb(0 0 0 / 25%) 0
      );
    background-position: 0 0, 12px 12px;
    background-size: 24px 24px;
  }

  &-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  &-preview {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid @border-color-base;
    // border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-preview-circle {
    border-radius: 50%;
  }

  &-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid @border-color-base;
  }
}
</style>
