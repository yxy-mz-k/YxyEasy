<template>
  <div class="my-webwin-video">
    <div ref="playWndRef" id="playWnd" class="playWnd"></div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  shallowRef,
  reactive,
  toRefs,
  onMounted,
  watch,
  computed,
  nextTick,
  provide,
  inject,
  getCurrentInstance,
  onBeforeUnmount,
  useAttrs,
} from "vue";

const attrs: any = useAttrs();

const playWndRef = ref();

import Mitt from "utils/Mitt";
import $ from "jquery";
const playWnd = document.getElementById("playWnd");

const initCount = ref(0);
const pubKey = ref("");
const oWebControl = ref(null);

const cameraIndexCode = ref("");
const title = ref("");
const downloadUrl = ref("");
const initPlugin = (val?: any) => {
  if (val) {
    cameraIndexCode.value = val.cameraIndex;
    title.value = val.name;
  }
  oWebControl.value = new WebControl({
    szPluginContainer: "playWnd", // 指定容器id
    iServicePortStart: 15900, // 指定起止端口号，建议使用该值
    iServicePortEnd: 15900,
    szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
    cbConnectSuccess: function () {
      // 创建WebControl实例成功
      oWebControl.value
        ?.JS_StartService("window", {
          // WebControl实例创建成功后需要启动服务
          dllPath: "./VideoPluginConnect.dll", // 值"./VideoPluginConnect.dll"写死
        })
        .then(
          function () {
            // 启动插件服务成功
            oWebControl.value
              ?.JS_CreateWnd(
                "playWnd",
                playWndRef.value.clientWidth,
                playWndRef.value.clientHeight,
              )
              .then(function () {
                //JS_CreateWnd创建视频播放窗口，宽高可设定
                init(); // 创建播放实例成功后初始化
              });
          },
          function () {
            // 启动插件服务失败
          },
        );
    },
    cbConnectError: function () {
      // 创建WebControl实例失败
      oWebControl.value = null;
      $("#playWnd").html(
        "插件未启动，正在尝试启动，请到这个地址下载并安装：" +
          downloadUrl.value,
      );
      WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
      initCount.value++;
      if (initCount.value < 3) {
        setTimeout(function () {
          // initPlugin();
        }, 3000);
      } else {
        $("#playWnd").html("插件启动失败，请检查插件是否安装！");
      }
    },
    cbConnectClose: function (bNormalClose) {
      // 异常断开：bNormalClose = false
      // JS_Disconnect正常断开：bNormalClose = true
      oWebControl.value = null;
      $("#playWnd").html(
        "插件未启动，正在尝试启动，请到这个地址下载并安装：" +
          downloadUrl.value,
      );
      WebControl.JS_WakeUp("VideoWebPlugin://");
      initCount.value++;
      if (initCount.value < 3) {
        setTimeout(function () {
          // nitPlugin();
        }, 3000);
      } else {
        $("#playWnd").html("插件启动失败，请检查插件是否安装！");
      }
    },
  });
};
//获取公钥
const getPubKey = (callback) => {
  oWebControl.value
    ?.JS_RequestInterface({
      funcName: "getRSAPubKey",
      argument: JSON.stringify({
        keyLength: 1024,
      }),
    })
    .then(function (oData) {
      if (oData.responseMsg.data) {
        pubKey.value = oData.responseMsg.data;
        callback?.();
      }
    });
};
//RSA加密
const setEncrypt = (value) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey.value);
  return encrypt.encrypt(value);
};
const init = () => {
  getPubKey(function () {
    let appkey = "27458050"; //综合安防管理平台提供的appkey，必填
    let secret = setEncrypt("0Jy4ICXhNivV3kLDFvNv"); //综合安防管理平台提供的secret，必填
    let ip = "36.154.240.154"; //综合安防管理平台IP地址，必填
    let playMode = 0; //初始播放模式：0-预览，1-回放
    let port = 36100; //综合安防管理平台端口，若启用HTTPS协议，默认443
    let snapDir = "D:\\SnapDir"; //抓图存储路径
    let videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
    let layout = "1x1"; //playMode指定模式的布局
    let enableHTTPS = 0; //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
    let encryptedFields = "secret"; //加密字段，默认加密领域为secret
    let showToolbar = 1; //是否显示工具栏，0-不显示，非0-显示
    let showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
    let buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮

    oWebControl.value
      ?.JS_RequestInterface({
        funcName: "init",
        argument: JSON.stringify({
          appkey: appkey, //API网关提供的appkey
          secret: secret, //API网关提供的secret
          ip: ip, //API网关IP地址
          playMode: playMode, //播放模式（决定显示预览还是回放界面）
          port: port, //端口
          snapDir: snapDir, //抓图存储路径
          videoDir: videoDir, //紧急录像或录像剪辑存储路径
          layout: layout, //布局
          enableHTTPS: enableHTTPS, //是否启用HTTPS协议
          encryptedFields: encryptedFields, //加密字段
          showToolbar: showToolbar, //是否显示工具栏
          showSmart: showSmart, //是否显示智能信息
          buttonIDs: buttonIDs, //自定义工具条按钮
        }),
      })
      .then(function (oData) {
        oWebControl.value?.JS_Resize(
          playWndRef.value.clientWidth,
          playWndRef.value.clientHeight,
        ); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
        if (attrs?.codeList?.length) {
          if (attrs?.codeList?.length === 1) {
            setLayout("1x1");
          } else if (
            attrs?.codeList?.length > 1 &&
            attrs?.codeList?.length < 5
          ) {
            setLayout("2x2");
          } else if (
            attrs?.codeList?.length > 4 &&
            attrs?.codeList?.length < 10
          ) {
            setLayout("3x3");
          } else if (attrs?.codeList?.length > 9) {
            setLayout("4x4");
          }
          attrs?.codeList?.map((i: any, index: number) => {
            startPreview(i, index + 1);
          });
        } else {
          setLayout("1x1");
          startPreview();
        }
      });
  });
};
// 点击开始
const startPreview = (code?: any, newWndId = -1) => {
  let streamMode = 0; //主子码流标识：0-主码流，1-子码流
  let transMode = 1; //传输协议：0-UDP，1-TCP
  let gpuMode = 0; //是否启用GPU硬解，0-不启用，1-启用
  let wndId = newWndId; //播放窗口序号（在2x2以上布局下可指定播放窗口）

  if (!oWebControl.value) {
    initPlugin();
    startPreview(code ? code : cameraIndexCode.value);
    return;
  }
  oWebControl.value?.JS_RequestInterface({
    funcName: "startPreview",
    argument: JSON.stringify({
      cameraIndexCode: code ? code : cameraIndexCode.value, //监控点编号
      // cameraIndexCode: "bb441322385c4b899cd60174838a6eb2",
      streamMode: streamMode, //主子码流标识
      transMode: transMode, //传输协议
      gpuMode: gpuMode, //是否开启GPU硬解
      wndId: wndId, //可指定播放窗口
    }),
  });
};
// 停止
const stopAllPreview = () => {
  oWebControl.value?.JS_RequestInterface({
    funcName: "stopAllPreview",
  });
};
const closeAllPreview = () => {
  if (oWebControl.value) {
    stopAllPreview();
    oWebControl.value?.JS_HideWnd();
    /* oWebControl.value.JS_Disconnect().then(
        function () {
          // 断开与插件服务连接成功
        },
        function () {
          // 断开与插件服务连接失败
        }
      );*/
    oWebControl.value
      ?.JS_DestroyWnd({
        funcName: "destroyeWnd",
      })
      .then(function () {});
  }
  oWebControl.value = null;
};
const diaLogClose = () => {
  closeAllPreview();
};

// 设置布局
const setLayout = (layout: string) => {
  oWebControl.value
    ?.JS_RequestInterface({
      funcName: "setLayout",
      argument: JSON.stringify({
        layout,
      }),
    })
    .then(function (oData) {});
};
//   监听尺寸的变化
const resizeObserver = new ResizeObserver((entries: any, b: any) => {
  if (oWebControl.value != null) {
    oWebControl.value?.JS_Resize(
      playWndRef.value.clientWidth,
      playWndRef.value.clientHeight,
    );
    // setWndCover();
  }
});
// 监听dom的变化（位置和大小）
// 观察器的配置（需要观察什么变动）
// const config = reactive({
//   // childList: true, // 观察目标子节点的变化，是否有添加或者删除
//   // attributes: true, // 观察属性变动
//   // subtree: true, // 观察后代节点，默认为 false
//   attributeFilter: ['style']
// });

// 创建一个观察器实例并传入回调函数
// const mutationObserver = new MutationObserver((mutationList:any,b:any) => {
//   // 当观察到变动时执行的回调函数
// });
// const {mouseDownDialog,mouseUpDialog} = value
const timeId = ref();
const mouseDownDialog = (e: any) => {
  timeId.value = setInterval(() => {
    if (oWebControl.value != null) {
      oWebControl.value?.JS_Resize(
        playWndRef.value.clientWidth,
        playWndRef.value.clientHeight,
      );
      // setWndCover();
    }
  }, 400);
};
const mouseUpDialog = (e: any) => {
  timeId.value ? clearInterval(timeId.value) : null;
  if (oWebControl.value != null) {
    oWebControl.value?.JS_Resize(
      playWndRef.value.clientWidth,
      playWndRef.value.clientHeight,
    );
    // setWndCover();
  }
};
watch(
  () => attrs?.code,
  (n: any) => {
    cameraIndexCode.value = n;
  },
);
onMounted(() => {
  Mitt.on("diaLogClose", diaLogClose);
  Mitt.on("mouseDownDialog", mouseDownDialog);
  Mitt.on("mouseUpDialog", mouseUpDialog);
  // 以上述配置开始观察目标节点
  resizeObserver.observe(playWndRef.value);
  cameraIndexCode.value = attrs?.code;
  // mutationObserver.observe(playWndRef.value, config);

  // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
  // window.addEventListener("resize", function () {
  //   if (oWebControl.value != null) {
  //     oWebControl.value.JS_Resize(playWndRef.value.clientWidth, playWndRef.value.clientHeight);
  //     // setWndCover();
  //   }
  // });
  initPlugin();
});
onBeforeUnmount(() => {
  closeAllPreview();
  // 之后，可停止观察
  // mutationObserver.disconnect();
  // Mitt.off("diaLogClose");
  Mitt.off("mouseDownDialog");
  Mitt.off("mouseUpDialog");
});
defineExpose({
  startPreview,
  stopAllPreview,
  setLayout,
});
</script>
<style lang="scss" scoped>
.my-webwin-video {
  width: 100%;
  height: 100%;

  .playWnd {
    width: 100%;
    height: 100%;
    min-height: 600px;
  }
}
</style>
