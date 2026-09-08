<template>
  <template v-if="list?.length">
    <div
      class="HandleFile"
      v-if="isImage"
      :class="[
        // attrs?.isFull ? 'HandleFile-fullImage' : isImage ? 'HandleFile-image' : '',
        attrs?.isInTable ?? true ? 'HandleFile-isInTable' : '',
        {
          'HandleFile-image-w-f flex gap-x-12px gap-y-10px flex-wrap':
            attrs?.FlatBed,
          'HandleFile-image-showFileNameToPreview':
            attrs?.showFileNameToPreview,
        },
      ]"
      :style="attrs?.customStyle"
    >
      <template v-if="!attrs?.showFileNameToPreview">
        <!-- <a-image :preview="preview" :src="list[0]?.url" @click="changePreview" /> -->
        <a-carousel
          :autoplay="false"
          :getContainer="attrs?.getContainer ?? getContainer"
          v-if="!attrs?.FlatBed"
        >
          <div
            v-for="item in list"
            :key="item.id"
            @click="openImage(item, list)"
          >
            <span
              v-if="attrs?.canDelete"
              class="delete-image-icon"
              @click.stop="deleteAttach(item)"
            >
              <CloseOutlined />
            </span>
            <!-- <a-image width="100%" height="100%" :preview="preview" :src="item?.path" /> -->
            <a-image
              width="100%"
              height="100%"
              :preview="preview"
              :style="
                attrs?.imageStyle ?? {
                  height: '100%',
                  'object-fit': 'fill',
                }
              "
              :src="item?.path"
            />
          </div>
        </a-carousel>
        <a-image-preview-group v-else>
          <a-image
            v-for="item in list"
            :key="item.uid"
            :src="item?.path"
            :style="
              attrs?.imageStyle ?? {
                height: '100px',
                'object-fit': 'fill',
              }
            "
          />
        </a-image-preview-group>
        <div style="display: none">
          <a-image-preview-group
            :preview="{
              visible: preview,
              onVisibleChange: (vis) => (preview = vis),
              getContainer: attrs?.getContainer ?? getContainer,
            }"
          >
            <!-- <a-image v-for="item in list" :key="item.uid" :src="item.path" /> -->
            <a-image v-for="item in list" :key="item.uid" :src="item?.path" />
          </a-image-preview-group>
        </div>
      </template>
      <template v-else>
        <a-carousel
          autoplay
          :getContainer="attrs?.getContainer ?? getContainer"
          v-if="!attrs?.FlatBed"
        >
          <div
            v-for="item in list"
            :key="item.id"
            @click="openImage(item, list)"
          >
            <span
              v-if="attrs?.canDelete"
              class="delete-image-icon"
              @click.stop="deleteAttach(item)"
            >
              <CloseOutlined />
            </span>
            <!-- <a-image width="100%" height="100%" :preview="preview" :src="item?.path" /> -->
            <div class="textEllipsis" style="color: #0960bd; text-align: left">
              {{ item?.name }}
            </div>
          </div>
        </a-carousel>
        <div style="display: none">
          <a-image-preview-group
            :preview="{
              visible: preview,
              onVisibleChange: (vis) => (preview = vis),
              getContainer: attrs?.getContainer ?? getContainer,
            }"
          >
            <!-- <a-image v-for="item in list" :key="item.uid" :src="item.path" /> -->
            <a-image v-for="item in list" :key="item.uid" :src="item?.path" />
          </a-image-preview-group>
        </div>
      </template>
    </div>
    <div class="HandleFile" v-else :style="attrs?.customStyle">
      <div v-for="item in list" :key="item.uid" class="HandleFile-file">
        <span
          @click="openAttachDialog(item, list)"
          class="HandleFile-file-text"
          v-loading="item.loading"
        >
          <template v-if="attrs?.tool">
            <ToolTip v-bind="attrs" :title="item.name" :value="item.name">
              {{ item.name }}
            </ToolTip>
          </template>
          <template v-else>
            {{ item.name }}
          </template>
        </span>
        <span
          v-if="attrs?.canDelete"
          class="delete-icon"
          @click="deleteAttach(item)"
        >
          <CloseOutlined />
        </span>
      </div>
    </div>
  </template>

  <div v-else>无</div>
  <!-- 附件弹窗 -->
  <AttachCom @register="registerAttach" />
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
  createVNode,
  useAttrs,
} from "vue";
const attrs: any = useAttrs();
const emits = defineEmits<{
  (e: "getFiles", k?: any): void;
}>();
const getContainer = () => document.body;

import { getPreViewUrl, exporFile } from "utils/downLoad";
import { getFileList } from "utils/index";
import { deleteFile, download } from "api/sys/fileUtils";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();
import ToolTip from "components/Y-ToolTip/index.vue";

const preview = ref(false);
const isImage = ref(false);
const list = reactive<any>([]);
const openImage = (item: any, list?: any) => {
  if (attrs?.clickAttach) {
    attrs.clickAttach?.(item, list);
    return;
  }
  preview.value = true;
};
const openAttachDialog = async (item: any, list?: any) => {
  if (attrs?.clickAttach) {
    attrs.clickAttach?.(item, list);
    return;
  }
  if (attrs?.isDownLoad) {
    item.loading = true;
    try {
      const src = await download(item.uid);
      item.loading = false;
      exporFile(src, item.name);
    } catch (err) {
      item.loading = false;
    }
  } else {
    openAttach(true, {
      src: getPreViewUrl(item.path),
      title: item.name,
      getContainer: attrs?.getContainer ?? getContainer,
    });
  }
};

const loading = ref(false);
const getFileLists = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    list.length = 0;
    if (attrs?.ids) {
      const files = await getFileList(attrs?.ids);
      list.push(...(files || []));
      // isImage.value = list?.[0]?.type.includes('image') || false;
      isImage.value = attrs?.isAllImage
        ? JSON.parse(attrs?.isAllImage)
        : list?.every((l: any) => l?.type?.includes("image"));
    }
  } finally {
    loading.value = false;
  }
};
const deleteAttach = (item: any) => {
  Modal.confirm({
    title: "请问确定删除吗(删除后无法找回)?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "确定",
    okType: "danger",
    cancelText: "取消",
    centered: true,
    maskClosable: true,
    async onOk() {
      const deleteresult = await deleteFile({
        id: item?.response?.result?.[0]?.id,
      });
      if (deleteresult == null) {
        createMessage.success("删除成功");
        const newList = list.filter(
          (l: any) =>
            l?.response?.result?.[0]?.id !== item?.response?.result?.[0]?.id,
        );
        list.length = 0;
        list.push(...(newList || []));
        emits("getFiles", list);
      }
    },
    onCancel() {},
  });
};
watch(
  () => attrs?.ids,
  (n: any) => {
    getFileLists();
  },
);
onMounted(() => {
  if (attrs?.ids) {
    getFileLists();
  }
});

onUnmounted(() => {
  list.length = 0;
  loading.value = false;
});

import { useModal } from "components/Modal";
import AttachCom from "components/Y-AttachCom/index.vue";
const [registerAttach, { openModal: openAttach }] = useModal();
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
