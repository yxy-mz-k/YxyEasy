<template>
  <div class="page-parent" v-loading="loading">
    <PageLayout>
      <div class="page-parent-content">
        <iframe
          id="ConfigIframeID"
          ref="iframeRef"
          :src="iframeSrc"
          :frameborder="0"
          scrolling="auto"
          width="100%"
          height="100%"
        >
        </iframe>
      </div>
    </PageLayout>
    <!-- 预览弹窗 -->
    <ViewDrawer @register="registerDrawer" />
  </div>
</template>

<script lang="ts" setup>
  import {
    defineComponent,
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
  } from 'vue';
  const attrs: any = useAttrs();
  import PageLayout from '/@/views/common/PageLayout/index.vue';
  const emits = defineEmits<{
    (e: 'back', k?: any): void;
    (e: 'save', k?: any): void;
    (e: 'resize', k?: any): void;
    (e: 'registerConfig', k?: any): Boolean;
    (e: 'success', k?: any): void;
  }>();
  const isContactSuccessful = ref(false);
  const iframeSrc = ref<any>('#');
  const iframeRef = ref();
  const channel = ref<any>(null);
  const timeId = ref<any>(null);

  const setRequest = (Data = null) => {
    const iframe: any = document.getElementById('ConfigIframeID');
    Data &&
      Object.keys(Data)?.map((key: any, index: number, arr: any) => {
        // iframe?.contentWindow?.postMessage(
        //   {
        //     type: 'from-parent-config-setRequest',
        //     index,
        //     length: arr.length,
        //     key,
        //     payload: JSON.stringify(Data[key]),
        //   },
        //   '*',
        // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
        channel.value?.port1?.postMessage({
          type: 'from-parent-config-setRequest',
          index,
          length: arr.length,
          key,
          payload: JSON.stringify(Data[key]),
        });
      });
  };

  const setImportJson = (Data = null) => {
    const iframe: any = document.getElementById('ConfigIframeID');
    Data &&
      Object.keys(Data)?.map((key: any, index: number, arr: any) => {
        // iframe?.contentWindow?.postMessage(
        //   {
        //     type: 'from-parent-config-setImportJson',
        //     index,
        //     length: arr.length,
        //     key,
        //     payload: JSON.stringify(Data[key]),
        //   },
        //   '*',
        // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
        channel.value?.port1?.postMessage({
          type: 'from-parent-config-setImportJson',
          index,
          length: arr.length,
          key,
          payload: JSON.stringify(Data[key]),
        });
      });
  };

  const sendDevice = (Data = []) => {
    const iframe: any = document.getElementById('ConfigIframeID');
    Object.keys(Data)?.map((key: any, index: number, arr: any) => {
      // iframe?.contentWindow?.postMessage(
      //   {
      //     type: 'from-parent-config-setDeviceInfo',
      //     index,
      //     length: arr.length,
      //     key,
      //     payload: JSON.stringify(Data[key]),
      //   },
      //   '*',
      // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
      channel.value?.port1?.postMessage({
        type: 'from-parent-config-setDeviceInfo',
        index,
        length: arr.length,
        key,
        payload: JSON.stringify(Data[key]),
      });
    });
  };

  const setPixel = (Data = []) => {
    // const atobSvg = Window.atob(svg);
    const iframe: any = document.getElementById('ConfigIframeID');
    Data &&
      Object.keys(Data)?.map((key: any, index: number, arr: any) => {
        // iframe?.contentWindow?.postMessage(
        //   {
        //     type: 'from-parent-config-setPixel',
        //     index,
        //     length: arr.length,
        //     key,
        //     payload: JSON.stringify(Data[key]),
        //   },
        //   '*',
        // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
        channel.value?.port1?.postMessage({
          type: 'from-parent-config-setPixel',
          index,
          length: arr.length,
          key,
          payload: JSON.stringify(Data[key]),
        });
      });
  };

  const iframeMessage = ref<any>({});
  const listenFromIframe = (event: any) => {
    // 监听来自iframe的消息
    // window.addEventListener('message', function (event) {
    // 安全检查，验证消息来源
    // if (event.origin !== "https://iframe-domain.com") return;
    if (event.data == 'from-iframe-already') {
      timeId.value ? clearInterval(timeId.value) : null;
      isContactSuccessful.value = true;
      handleMap();
    } else if (event.data.type === 'from-iframe-config-preview-data') {
      iframeMessage.value.previewDone = false;
      iframeMessage.value.previewData = <any>Object.assign({}, iframeMessage.value.previewData);
      iframeMessage.value.previewData = Object.assign({}, iframeMessage.value.previewData, {
        [event.data.key]: event.data.payload ? JSON.parse(event.data.payload) : null,
      });
      if (event.data.index == event.data.length - 1) {
        iframeMessage.value.previewDone = true;
      } else {
        iframeMessage.value.previewDone = false;
      }
      // 处理保存逻辑...
    } else if (event.data.type === 'from-iframe-config-back-data') {
      iframeMessage.value.backDone = false;
      iframeMessage.value.backData = <any>Object.assign({}, iframeMessage.value.backData);
      iframeMessage.value.backData = Object.assign({}, iframeMessage.value.backData, {
        [event.data.key]: event.data.payload ? JSON.parse(event.data.payload) : null,
      });
      if (event.data.index == event.data.length - 1) {
        iframeMessage.value.backDone = true;
      } else {
        iframeMessage.value.backDone = false;
      }
      emits('back');
      // 处理保存逻辑...
    } else if (event.data.type === 'from-iframe-config-save-data') {
      iframeMessage.value.saveDone = false;
      iframeMessage.value.saveData = <any>Object.assign({}, iframeMessage.value.saveData);
      iframeMessage.value.saveData = Object.assign({}, iframeMessage.value.saveData, {
        [event.data.key]: event.data.payload ? JSON.parse(event.data.payload) : null,
      });
      if (event.data.index == event.data.length - 1) {
        iframeMessage.value.saveDone = true;
      } else {
        iframeMessage.value.saveDone = false;
      }
      // 处理保存逻辑...
    } else if (event.data.type === 'from-iframe-config-resize-data') {
      iframeMessage.value.resizeDone = false;
      iframeMessage.value.resizeData = <any>Object.assign({}, iframeMessage.value.resizeData);
      iframeMessage.value.resizeData = Object.assign({}, iframeMessage.value.resizeData, {
        [event.data.key]: event.data.payload ? JSON.parse(event.data.payload) : null,
      });
      if (event.data.index == event.data.length - 1) {
        iframeMessage.value.resizeDone = true;
      } else {
        iframeMessage.value.resizeDone = false;
      }
      // 处理保存逻辑...
    } else if (event.data.type === 'from-iframe-config-register-config-net-edit') {
      emits('registerConfig', event.data.payload);
      // 处理保存逻辑...
    }
    // });
  };

  const handleMap = async () => {
    deviceData.length = 0;
    if (route?.query?.id) {
      let res: any = await devices({
        pid: route?.query?.id,
      });
      const data = getDevice(res);
      // const data = res?.map((r: any) => {
      //   const children =
      //     r?.factors?.map((f: any) => {
      //       return {
      //         value: `${r?.code}~${f?.code}`,
      //         label: f?.name,
      //       };
      //     }) || [];
      //   return {
      //     value: r?.code,
      //     label: r?.name,
      //     children,
      //   };
      // });
      deviceData.push(...(data || []));
    } else {
      let res: any = await devices({
        pid: attrs?.record?.id,
      });
      const data = getDevice(res);
      // const data = res?.map((r: any) => {
      //   const children =
      //     r?.factors?.map((f: any) => {
      //       return {
      //         value: `${r?.code}~${f?.code}`,
      //         label: f?.name,
      //       };
      //     }) || [];
      //   return {
      //     value: r?.code,
      //     label: r?.name,
      //     children,
      //   };
      // });
      deviceData.push(...(data || []));
    }

    pixelData.length = 0;
    if (route?.query?.id) {
      // 新窗口
      let data: any = await queryTy({
        id: route?.query?.id,
      });
      getPixel(data);
      pixelData.push(...(data || []));
    } else {
      let data: any = await queryTy({
        id: attrs?.record?.id,
      });
      getPixel(data);
      pixelData.push(...(data || []));
    }

    let importData: any = null;
    if (route?.query?.id) {
      let importDataRes: any = await queryById({
        id: route?.query?.id,
      });
      importData = importDataRes?.content ? JSON.parse(importDataRes?.content) : null;
    } else {
      let importDataRes: any = await queryById({
        id: attrs?.record?.id,
      });
      importData = importDataRes?.content ? JSON.parse(importDataRes?.content) : null;
    }

    let requestInfo: any = null;
    if (route?.query?.id) {
      requestInfo = Object.assign(
        {},
        {
          token: route?.query?.token,
          baseURL: origin,
        },
      );
    } else {
      requestInfo = Object.assign(
        {},
        {
          token: attrs?.token,
          baseURL: origin,
        },
      );
    }
    loading.value = false;
    // setTimeout(() => {
    setRequest(requestInfo);
    sendDevice(deviceData);
    setPixel(pixelData);

    importData && setImportJson(importData);
    // }, 1000);
  };

  import { useRouter } from 'vue-router';
  const router = useRouter();
  watch(
    () => iframeMessage.value.previewDone,
    (n: any) => {
      if (n) {
        // const content = JSON.stringify(iframeMessage.value.previewData);
        // openDrawer(true, {
        //   record: Object.assign({}, attrs?.record, {
        //     content,
        //   }),
        //   token: attrs?.token,
        // });
        const routeUrl = router.resolve({
          path: '/configurationview',
          query: {
            id: attrs?.record.id,
            token: attrs?.token,
          },
        });
        window.open(routeUrl.href, '_blank');
      }
    },
  );

  import { edit } from '/@/views/TopologyManage/TopologyProject/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  watch(
    () => iframeMessage.value.saveDone,
    async (n: any) => {
      if (n) {
        if (route.query?.id) {
          try {
            const content = JSON.stringify(iframeMessage.value.saveData);
            let res: any = await edit({
              id: route.query?.id,
              pid: route.query?.pid,
              pcid: route.query?.pcid,
              content,
            });
            // handleCancel();
          } catch (err) {}
        } else {
          try {
            const content = JSON.stringify(iframeMessage.value.saveData);
            let res: any = await edit({
              id: attrs?.record?.id,
              pid: attrs?.record?.pid,
              pcid: attrs?.record?.pcid,
              content,
            });
            emits('success');
            // handleCancel();
          } catch (err) {}
        }

        // emits('save', iframeMessage.value.saveData);
      }
    },
  );
  watch(
    () => iframeMessage.value.resizeDone,
    (n: any) => {
      if (n) {
        emits('resize', iframeMessage.value.resizeData);
      }
    },
  );

  import { useDrawer } from '/@/components/Drawer';
  import ViewDrawer from './ViewDraw.vue';
  const [registerDrawer, { openDrawer: openDrawer }] = useDrawer();

  import { useRoute } from 'vue-router';
  const route = useRoute();
  import { devices, queryById, queryTy } from '/@/views/TopologyManage/TopologyProject/api';
  const pixelData = reactive<any>([]);
  const deviceData = reactive<any>([]);

  const isEnv = import.meta.env['MODE'] === 'development' ? true : false;
  const origin = isEnv ? import.meta.env['VITE_ORIGIN'] : window.location.origin;
  const loading = ref(false);
  const getDevice = (res: any) => {
    return res?.map((r: any) => {
      const children =
        r?.factors?.map((f: any) => {
          return {
            value: `${r?.code}~${f?.code}`,
            label: f?.name,
          };
        }) || [];
      return {
        value: r?.code,
        label: r?.name,
        children,
      };
    });
  };

  const getPixel = (data: any) => {
    data?.map((p: any) => {
      p?.children?.map((c: any) => {
        if (c?.type == 'svg') {
          if (c?.svg) {
            c.atobSvg = atob(c?.svg);
            const fill = c?.props?.fill || null;
            const fillOpacity = c?.props?.fillOpacity || null;

            const stroke = c?.props?.stroke || null;
            const strokeWidth = c?.props?.strokeWidth || null;

            if (fill && fill != 'none') {
              c.props = Object.assign({}, c?.props, {
                fill: {
                  type: 'color',
                  val: fill,
                  title: '填充色',
                },
              });
            }
            if (fillOpacity) {
              c.props = Object.assign({}, c?.props, {
                'fill-opacity': {
                  type: 'input',
                  val: fillOpacity,
                  title: '填充透明度',
                },
              });
            }
            if (stroke && stroke != 'none') {
              c.props = Object.assign({}, c?.props, {
                stroke: {
                  type: 'color',
                  val: stroke,
                  title: '描边',
                },
              });
            }
            if (strokeWidth) {
              c.props = Object.assign({}, c?.props, {
                'stroke-width': {
                  type: 'number',
                  val: strokeWidth,
                  title: '描边大小',
                },
              });
            }
          }
        } else {
          c.props = null;
        }
        const thumbnail = c?.thumbnail;
        c.thumbnail = thumbnail
          ? isEnv
            ? `${import.meta.env['VITE_ORIGIN']}/ioe/api/file/imgFile/${thumbnail}`
            : `/ioe/api/file/imgFile/${thumbnail}`
          : null;
      });
    });
  };
  onMounted(async () => {
    iframeSrc.value = `${origin}/cfg/#/configuration`;

    // window.removeEventListener('message', listenFromIframe);
    // window.addEventListener('message', listenFromIframe);
    // listenFromIframe();
    loading.value = true;
  });
  onUnmounted(() => {
    // window.removeEventListener('message', listenFromIframe);
    timeId.value ? clearInterval(timeId.value) : null;
  });

  watch(
    [isContactSuccessful, iframeSrc],
    (n: any) => {
      if (!n[0] && n[1]) {
        nextTick(() => {
          const iframe: any = document.getElementById('ConfigIframeID');
          if (iframe) {
            iframe.onload = () => {
              channel.value = new MessageChannel();
              channel.value.port1.onmessage = listenFromIframe;
              if (!isContactSuccessful.value) {
                timeId.value ? clearInterval(timeId.value) : null;
                timeId.value = setInterval(() => {
                  iframe.contentWindow.postMessage('init', '*', [channel.value?.port2]);
                }, 1000);
              }
            };
          }
        });
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  defineExpose({
    setRequest,
    setImportJson,
    sendDevice,
    setPixel,
  });
</script>
<style lang="scss" scoped>
  .page-parent {
    .page-parent-content {
      padding: 0;
    }
  }
</style>
