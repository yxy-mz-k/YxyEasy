<template>
  <div class="page-parent" v-loading="loading">
    <PageLayout>
      <div class="page-parent-content">
        <iframe
          id="ConfigViewIframeID"
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
    <RISKDAM
      ref="CustomDiaDamRef"
      :CustomDiaStyle="CustomDiaStyle"
      :code="damCode"
      :hiddenLine="true"
      :canDraggle="true"
    />
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
    (e: 'click', k?: any): void;
    (e: 'registerConfig', k?: any): Boolean;
  }>();

  const isContactSuccessful = ref(false);
  const iframeSrc = ref<any>('#');
  const iframeRef = ref();
  const channel = ref<any>(null);
  const timeId = ref<any>(null);

  const setConfig = (
    configData = {
      exportJson: {},
      canZoom: true,
      canDrag: false,
      showPopover: false,
    },
  ) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
    Object.keys(configData)?.map((key: any, index: number, arr: any) => {
      // iframe?.contentWindow?.postMessage(
      //   {
      //     type: 'from-parent-config-config',
      //     index,
      //     length: arr.length,
      //     key,
      //     payload: configData[key],
      //   },
      //   '*',
      // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
      channel.value?.port1?.postMessage({
        type: 'from-parent-config-config',
        index,
        length: arr.length,
        key,
        payload: configData[key],
      });
    });
  };

  const setRequest = (Data = null) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
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

  const setImportJson = (Data = []) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
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

  const setPixel = (Data = []) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
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

  const setItemAttrByID = (id: any, key: any, val: any, options: any) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
    // iframe?.contentWindow?.postMessage(
    //   {
    //     type: 'from-parent-config-setItemAttrByID',
    //     id,
    //     key,
    //     val,
    //     options,
    //   },
    //   '*',
    // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
    channel.value?.port1?.postMessage({
      type: 'from-parent-config-setItemAttrByID',
      id,
      key,
      val,
      options,
    });
  };
  const setItemAttrs = (Data = attrs?.itemAttrsData) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
    Data &&
      Object.keys(Data)?.map((key: any, index: number, arr: any) => {
        // iframe?.contentWindow?.postMessage(
        //   {
        //     type: 'from-parent-config-setItemAttrs',
        //     index,
        //     length: arr.length,
        //     key,
        //     payload: JSON.stringify(Data[key]),
        //   },
        //   '*',
        // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
        channel.value?.port1?.postMessage({
          type: 'from-parent-config-setItemAttrs',
          index,
          length: arr.length,
          key,
          payload: JSON.stringify(Data[key]),
        });
      });
  };
  const setDevicePointByID = (id: any, val: any, options: any) => {
    const iframe: any = document.getElementById('ConfigViewIframeID');
    // iframe?.contentWindow?.postMessage(
    //   {
    //     type: 'from-parent-config-setDevicePointByID',
    //     id,
    //     val,
    //     options,
    //   },
    //   '*',
    // ); // 第二个参数是目标origin，生产环境应指定具体域名而非'*'
    channel.value?.port1?.postMessage({
      type: 'from-parent-config-setDevicePointByID',
      id,
      val,
      options,
    });
  };

  const listenFromIframe = (event: any) => {
    // 监听来自iframe的消息
    // window.addEventListener('message', function (event) {
    // 安全检查，验证消息来源
    // if (event.origin !== "https://iframe-domain.com") return;
    if (event.data == 'from-iframe-already') {
      timeId.value ? clearInterval(timeId.value) : null;
      isContactSuccessful.value = true;
      handleMap();
    } else if (event.data.type === 'from-iframe-config-item-click') {
      handleClickItem(event.data.payload);
      // 处理保存逻辑...
    } else if (event.data.type === 'from-iframe-config-register-config-net-preview') {
      emits('registerConfig', event.data.payload);
      // 处理保存逻辑...
    }
    // });
  };

  const handleMap = async () => {
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
    setPixel(pixelData);

    importData && setImportJson(importData);
    // }, 1000);
  };

  import RISKDAM from './RISKDAM.vue';

  import { computedStylePosition } from '/@/utils/index';
  const damCode = ref<any>('');
  const CustomDiaDamRef = ref();
  const CustomDiaStyle = ref<any>({
    width: '550px',
    height: '390px',
  });
  const handleClickItem = (e: any) => {
    const data = e ? JSON.parse(e) : [];
    if (data?.[0] == 'open-dam-dialog') {
      damCode.value = data?.[1];
      CustomDiaStyle.value = Object.assign(
        {},
        {
          width: '550px',
          height: '390px',
        },
        computedStylePosition(
          Object.assign(
            {},
            {
              x: data?.[2]?.binfo?.left,
              y: data?.[2]?.binfo?.top,
              interval: 20,
            },
            {
              w: 550,
              h: 390,
            },
          ),
        ),
      );
      CustomDiaDamRef.value?.openDialog();
    } else {
      emits('click', e);
    }
  };

  import { useRoute } from 'vue-router';
  const route = useRoute();
  import { queryById, queryTy } from '/@/views/TopologyManage/TopologyProject/api';

  const pixelData = reactive<any>([]);

  const isEnv = import.meta.env['MODE'] === 'development' ? true : false;
  const origin = isEnv ? import.meta.env['VITE_ORIGIN'] : window.location.origin;

  const loading = ref(false);
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
    iframeSrc.value = `${origin}/cfg/#/configurationview`;

    // window.removeEventListener('message', listenFromIframe);
    // window.addEventListener('message', listenFromIframe);
    // nextTick(async () => {
    loading.value = true;

    // });
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
          const iframe: any = document.getElementById('ConfigViewIframeID');
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
    setConfig,
    setRequest,
    setImportJson,
    setPixel,
    setItemAttrByID,
    setItemAttrs,
    setDevicePointByID,
  });
</script>
<style lang="scss" scoped>
  .page-parent {
    :deep(.page-layout-index) {
      padding: 0;
    }
    .page-parent-content {
      padding: 0;
    }
  }
</style>
