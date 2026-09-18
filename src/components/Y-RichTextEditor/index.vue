<template>
  <!-- 富文本编辑器 -->
  <div class="Rich-Text-Editor" :class="readOnly ? 'border-left' : 'border'">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      class="Rich-Text-Editor-Toolbar"
    />
    <Editor
      style="max-height: 650px"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      class="Rich-Text-Editor-Editor"
    />
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
  shallowRef,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getGlobalConfig } from "utils/global";
import { getUrlRelativePath } from "utils/handleApiUrl";
const emits = defineEmits<{
  (e: "getEditorHtml", k?: any): void;
  (e: "getEditorText", k?: any): void;
}>();
interface Props {
  html?: any;
  readOnly?: any;
}
const props = withDefaults(defineProps<Props>(), {
  readOnly: false,
});
const { html, readOnly } = toRefs(props);

import { useUserStoreWithOut } from "store/modules/user";
const userStore = useUserStoreWithOut();
const mode = ref("default");
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const toolbarConfig = ref<any>({
  excludeKeys: ["fullScreen"],
});

// 内容 HTML
const valueHtml = ref<any>("");
const editorConfig = ref<any>({
  placeholder: "请输入内容...",
  readOnly: readOnly.value,
  MENU_CONF: {
    uploadImage: {
      server: getGlobalConfig()?.isEnv
        ? `${getGlobalConfig()?.suffixApi}-center` +
          getUrlRelativePath() +
          "/api/file/upload"
        : getUrlRelativePath() + "/api/file/upload",
      fieldName: "file",
      headers: {
        Accept: "application/json, text/plain, */*",
        XAccessToken: userStore.getToken,
      },
    },
  },
});
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  valueHtml.value = html.value;
};
const handleChange = (editor: any) => {
  const html = editor.getHtml();
  const text = editor.getText();
  emits("getEditorHtml", html);
  emits("getEditorText", text);
};
watch([html, editorRef], (n: any) => {
  if (n[1]) {
    valueHtml.value = n[0];
  }
});
onMounted(() => {});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
