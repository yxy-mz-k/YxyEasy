<template>
  <json-viewer
    :value="data"
    :expand-depth="3"
    :copyable="{ copyText: '复制', copiedText: '已复制' }"
    :boxed="true"
    :sort="false"
  />
</template>

<script lang="ts" setup>
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/vue3-json-viewer.css';
  defineProps({
    data: Object,
  });
</script>
