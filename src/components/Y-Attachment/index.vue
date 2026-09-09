<template>
  <div class="Attachment">
    <a-space
      :size="10"
      style="align-items: start !important"
      :class="listType == 'picture' ? 'picture-Attachment' : ''"
    >
      <a-upload
        v-model:file-list="fileList"
        name="file"
        action="#"
        @remove="handleRemove"
        :customRequest="uploadFile"
        :showUploadList="attrs?.showUploadList ?? true"
        :disabled="attrs?.disabled || disabledUpload"
        :multiple="attrs?.multiple ?? false"
        :maxCount="attrs?.maxCount ?? 1000"
        :listType="listType"
        :accept="attrs?.accept"
        v-if="listType == 'text'"
      >
        <slot name="uploadAttach">
          <a-button
            type="primary"
            :disabled="attrs?.disabled || disabledUpload"
            v-if="attrs?.showBtn ?? true"
          >
            <template #icon>
              <cloud-upload-outlined />
            </template>
            {{ attrs?.text || "点击上传" }}
          </a-button>
        </slot>
        <slot name="tips"></slot>
        <template #itemRender="{ file, actions }">
          <slot name="textItem" :file="file" :handleRemove="handleRemove">
            <div class="custom-render flex items-center gap-x-12px">
              <paper-clip-outlined />
              <span
                class="custom-render-name flex-1 textEllipsis"
                @click="DownFile(file)"
              >
                {{ file?.response?.result?.[0]?.fileName }}
              </span>
              <delete-outlined
                class="custom-render-del"
                @click="handleRemove(file)"
              />
            </div>
          </slot>
        </template>
      </a-upload>
      <!-- <a-button
        type="primary"
        @click="clearFile"
        :disabled="attrs?.disabled || disabledUpload"
        v-if="attrs?.showBtn ?? true && attrs?.showClear && listType == 'text'"
      >
        清空列表
      </a-button> -->
      <a-upload
        v-model:file-list="fileList"
        name="avatar"
        action="#"
        @remove="handleRemove"
        :customRequest="uploadFile"
        :show-upload-list="attrs?.showUploadList ?? true"
        :disabled="attrs?.disabled || disabledUpload"
        :multiple="attrs?.multiple ?? false"
        :maxCount="attrs?.maxCount ?? 1000"
        :listType="listType"
        :accept="attrs?.accept"
        :openFileDialogOnClick="
          attrs?.needCrop ? false : attrs?.openFileDialogOnClick ?? true
        "
        v-if="listType == 'picture-card' || listType == 'picture'"
      >
        <div
          v-if="attrs?.showBtn ?? true"
          :class="listType == 'picture' ? 'picture-upload' : ''"
          @click="openCrop(null)"
          :style="{
            width: '100px',
            height: '105px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: '8px',
          }"
        >
          <slot name="uploadAttach">
            <loading-outlined v-if="disabledUpload" />
            <plus-outlined v-else />
            <div class="ant-upload-text">{{ attrs?.text || "选择图片" }}</div>
          </slot>
        </div>
        <slot name="tips"></slot>
        <template #itemRender="{ file, actions }">
          <template v-if="file?.type?.includes('svg')">
            <div
              style="
                width: 100%;
                height: 100%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              "
            >
              <a-image :src="file?.svgSrc" />
              <div
                style="position: absolute; top: 0; right: 0; cursor: pointer"
              >
                <delete-outlined
                  style="color: red"
                  @click="handleRemove(file)"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div
              style="
                width: 100%;
                height: 100%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              "
            >
              <a-image
                :src="file?.path"
                :preview="attrs?.needCrop ? false : attrs?.preview ?? true"
                @click="openCrop(file)"
              />
              <div
                style="position: absolute; top: 0; right: 0; cursor: pointer"
              >
                <delete-outlined
                  style="color: red"
                  @click="handleRemove(file)"
                />
              </div>
            </div>
          </template>
        </template>
      </a-upload>
    </a-space>

    <CopperUpLoadModal
      @register="registerCopperUpLoadModal"
      @uploadSuccess="handleSuccess"
    />
    <CopperModal @register="registerCopperModal" @success="handleSuccess" />
  </div>
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
  useAttrs,
  createVNode,
} from "vue";
const attrs: any = useAttrs();
const emits = defineEmits<{
  (e: "getFiles", k?: any): void;
  (e: "changeOkLoading", k?: any): void;
}>();

interface Props {
  listType?: any;
}
const props = withDefaults(defineProps<Props>(), {
  listType: "text",
});
const { listType } = toRefs(props);

import { uploadFileApi, deleteFile, queryByIds } from "api/sys/fileUtils";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();
import { getFileList } from "utils/other";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

const fileList = ref<any>([]);
const disabledUpload = ref(false);

const DownFile = (file: any) => {
  window.open(
    origin + file?.path?.includes("oss") ? file?.path : "/oss" + file?.path,
  );
};
const openCrop = (file?: any) => {
  if (attrs?.needCrop) {
    if (file) {
      const src =
        origin + file?.path?.includes("oss") ? file?.path : "/oss" + file?.path;
      openCopperModal(true, {
        name: file?.name,
        circled: attrs?.circled ?? false,
        src,
        uid: file?.uid,
        uploadApi: uploadFileApi,
        DirectlyFile: attrs?.DirectlyFile,
        options: {
          aspectRatio: 37 / 18,
          scalable: false,
          cropBoxResizable: false,
        },
      });
    } else {
      openCopperUpLoadModal(true, {
        circled: attrs?.circled ?? false,
        uploadApi: uploadFileApi,
        DirectlyFile: attrs?.DirectlyFile,
        options: {
          aspectRatio: 37 / 18,
          scalable: false,
          cropBoxResizable: false,
        },
      });
    }
  }
};

const handleSuccess = async (e: any) => {
  if (attrs?.DirectlyFile) {
    emits("changeOkLoading", false);
    emits("getFiles", e.data);
  } else {
    const ids = e?.data?.result?.[0]?.id;
    const files = await getFileList(ids);
    if (e?.uid) {
      const index = fileList.value.findIndex((item: any) => item.uid !== e.uid);
      fileList.value.splice(index, 1, ...files);
    } else {
      fileList.value.push(...(files || []));
    }
    emits("changeOkLoading", false);
    emits("getFiles", fileList.value);
  }
};

import { getGlobalConfig } from "utils/global.js";
const origin = getGlobalConfig()?.VITE_ORIGIN;
const uploadFile = (e: any) => {
  emits("changeOkLoading", true);

  const acceptArr = attrs?.accept
    ?.split(",")
    ?.map((a: any) => a.replace(".", ""));
  const isMeetConditions = acceptArr?.every((a: any) => {
    if (a == "xls") {
      return !e?.file?.type?.includes("excel");
    } else if (a == "xlsx") {
      return (
        !e?.file?.type?.includes("office") && !e?.file?.type?.includes("sheet")
      );
    } else if (a == "doc") {
      return !e?.file?.type?.includes("msword");
    } else if (a == "docx") {
      return !e?.file?.type?.includes("officedocument.word");
    } else {
      return !e?.file?.type?.includes(a);
    }
  });

  if (isMeetConditions) {
    createMessage.warn(`只允许上传${attrs?.accept}`);
    fileList.value = fileList.value.filter((f: any) => f.uid !== e.file.uid);
    emits("changeOkLoading", false);
    if (!attrs?.DirectlyFile) {
      emits("getFiles", fileList.value);
    }

    return;
  }
  if (attrs?.maxSize) {
    if (e.file.size > attrs.maxSize * 1024 * 1024) {
      createMessage.warning(`文件大小不能超过${attrs.maxSize}M`);
      fileList.value = fileList.value.filter((f: any) => f.uid !== e.file.uid);
      emits("changeOkLoading", false);
      if (!attrs?.DirectlyFile) {
        emits("getFiles", fileList.value);
      }
      return;
    }
  }
  e.file.uploadType = attrs?.uploadType || "";
  disabledUpload.value = true;
  if (attrs?.DirectlyFile) {
    emits("changeOkLoading", false);
    emits("getFiles", e?.file);
    disabledUpload.value = false;
    return;
  }
  // 上传接口  e.file 就是接口所用的 file
  uploadFileApi({
    file: e?.file,
    onUploadProgress: (ev) => {
      // ev - axios 上传进度实例，上传过程触发多次
      // ev.loaded 当前已上传内容的大小，ev.total - 本次上传请求内容总大小
      const percent = (ev.loaded / ev.total) * 100;
      // 计算出上传进度，调用组件进度条方法
      e?.onProgress?.({ percent });
    },
    moreoverParams: attrs?.moreoverParams,
  })
    .then((res) => {
      if (res?.data?.code == 200) {
        e?.onSuccess?.(res.data, e);
        fileList.value?.map((f: any) => {
          f.path = f?.response?.result[0]?.path?.includes("oss")
            ? f?.response?.result?.[0]?.path
            : "/oss" + f?.response?.result?.[0]?.path;
          if (f?.type?.includes("svg")) {
            f.svgSrc = `${origin}/ioe/api/file/imgFile/${f?.response?.result?.[0]?.id}`;
          }
        });

        if (fileList.value?.every((f: any) => f.status == "done")) {
          disabledUpload.value = false;
          emits("changeOkLoading", false);
          emits("getFiles", fileList.value);
        }
      } else {
        // fileList.value = fileList.value.filter((f: any) => f.uid !== e.file.uid);
        e?.onError?.(res.data.message);
        disabledUpload.value = false;
        emits("changeOkLoading", false);
      }
      // setModalProps({ okButtonProps: { disabled: false } });
    })
    .catch((err) => {
      nextTick(() => {
        const index = fileList.value?.findIndex(
          (item: any) => item.uid === e.file.uid,
        );
        fileList.value.splice(index, 1);
        emits("getFiles", fileList.value);
        emits("changeOkLoading", false);
      });

      // setModalProps({ okButtonProps: { disabled: false } });
      createMessage.error(err);
      e?.onError?.(err);
      disabledUpload.value = false;
    });
};
const handleRemove = async (file: any, type = "remove") => {
  if (type == "clear") {
    if (file.status == "error") {
      fileList.value = fileList.value?.filter((f: any) => f.uid !== file.uid);
      return true;
    }
    if (file?.response?.result) {
      // 调用删除接口
      const deleteresult = await deleteFile({ id: file.response.result[0].id });
      if (deleteresult == null) {
        fileList.value = fileList.value?.filter((f: any) => f.uid !== file.uid);
        return true;
      }
    }
    return false;
  } else {
    Modal.confirm({
      title: "请问确定删除吗(删除后无法找回)?",
      icon: createVNode(ExclamationCircleOutlined),
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      centered: true,
      maskClosable: true,
      async onOk() {
        if (file.status == "error") {
          fileList.value = fileList.value?.filter(
            (f: any) => f.uid !== file.uid,
          );
          emits("getFiles", fileList.value);
          return true;
        }
        if (file?.response?.result) {
          // 调用删除接口
          const deleteresult = await deleteFile({
            id: file.response.result[0].id,
          });
          if (deleteresult == null) {
            fileList.value = fileList.value?.filter(
              (f: any) => f.uid !== file.uid,
            );
            emits("getFiles", fileList.value);
            return true;
          }
        }
        return false;
      },
      onCancel() {
        return false;
      },
    });
  }
  return false;
};
const clearFile = async () => {
  Modal.confirm({
    title: "请问确定删除吗(删除后无法找回)?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "确定",
    okType: "danger",
    cancelText: "取消",
    centered: true,
    maskClosable: true,
    async onOk() {
      const result: any = [];
      fileList.value?.length
        ? fileList.value?.map((file: any) => {
            result.push(handleRemove(file, "clear"));
          })
        : null;
      try {
        const allPromise = await Promise.all(result);
        if (allPromise.every(Boolean)) {
          fileList.value = [];
          emits("getFiles", fileList.value);
        }
      } catch (err) {}
    },
    onCancel() {
      return false;
    },
  });
};
const getFileLists = async () => {
  fileList.value = [];
  if (attrs?.ids) {
    const files = await getFileList(attrs?.ids);
    fileList.value.push(...(files || []));
    emits("getFiles", fileList.value);
  }
};

import { useModal } from "components/Modal";
import CopperUpLoadModal from "components/Cropper/src/CopperModal.vue";
const [registerCopperUpLoadModal, { openModal: openCopperUpLoadModal }] =
  useModal();
import CopperModal from "./CopperModal.vue";
const [registerCopperModal, { openModal: openCopperModal }] = useModal();

// watchEffect(() => {
//   emits('getFiles', fileList.value);
// });
watch(
  () => attrs?.ids,
  (n: any) => {
    getFileLists();
  },
);
onMounted(() => {
  getFileLists();
});

defineExpose({
  handleRemove,
});
</script>
<style lang="scss" scoped>
.Attachment {
  width: 100%;
  height: 100%;
  .picture-Attachment {
    width: 100%;
    height: 100%;
    :deep(.ant-space-item) {
      width: 100%;
    }
    .picture-upload {
      width: 105px;
      height: 105px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 5px;
      background-color: #fafafa;
      border: 1px dashed #d9d9d9;
    }
  }
  :deep(.ant-upload-list-picture-card) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  :deep(.ant-upload-select-picture) {
    width: 100px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .ant-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  :deep(.ant-upload-list-picture) {
    .ant-upload-list-picture-container {
      .ant-image {
        width: 100%;
        height: 120px;
        .ant-image-img {
          width: 120px;
        }
      }
    }
  }

  :deep(.ant-upload-list-text) {
    .ant-upload-list-text-container {
      .custom-render {
        width: 100%;
        margin-top: 8px;
        color: #878787;
        padding: 0 12px;
        box-sizing: border-box;
        &-name {
          color: #0960bd;
          cursor: pointer;
          width: 100px;
        }
        &-del {
          display: none;
        }
      }
      .custom-render:hover {
        background-color: #f5f5f5;
        .custom-render-del {
          display: inline-block;
        }
      }
    }
  }

  :deep(.ant-space) {
    width: 100%;
    height: 100%;
    .ant-space-item {
      width: 100%;
      height: 100%;
      span {
        .ant-upload-list-text {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
