<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    centered
    destroyOnClose
    :footer="false"
    width="60%"
    @cancel="handleCancel"
    @fullscreen="handleFullScreen"
    @mousedown="mouseDownDialog"
    @mouseup="mouseUpDialog"
  >
    <div class="video-dialog-content" :loading="loading">
      <div
        v-for="(i, index) in videoUrlList"
        :key="index"
        class="video-dialog-content-item"
        :style="getVideoItemStyle()"
      >
        <template v-if="!i?.playAddr">
          <div class="video-dialog-content-item-c">
            {{ i?.code }}
          </div>
        </template>
        <template v-else>
          <div
            class="video-dialog-content-item-c"
            :ref="(el) => setItemRef(el, index)"
          >
            <iframe
              v-if="i?.playMode == 'flv' || i?.playMode == 'hkcj'"
              :id="`videoIframe${index}`"
              :src="i?.playAddr"
              :frameborder="0"
              scrolling="auto"
              width="100%"
              height="100%"
              :allowFullScreen="true"
            ></iframe>
            <video
              v-else-if="i?.playMode == 'hls'"
              :id="`video${index}`"
              controls
              :style="{
                width: '100%',
                height: '100%',
              }"
            ></video>
            <div
              v-if="i?.playMode == 'hls' && i?.deviceType == '1'"
              class="video-arrow"
            >
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-left"
                @mousedown="ToMDirection(i, 'LEFT', 0)"
                @mouseup="ToMDirection(i, 'LEFT', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-right"
                @mousedown="ToMDirection(i, 'RIGHT', 0)"
                @mouseup="ToMDirection(i, 'RIGHT', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-up"
                @mousedown="ToMDirection(i, 'UP', 0)"
                @mouseup="ToMDirection(i, 'UP', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-down"
                @mousedown="ToMDirection(i, 'DOWN', 0)"
                @mouseup="ToMDirection(i, 'DOWN', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-leftup"
                @mousedown="ToMDirection(i, 'LEFT_UP', 0)"
                @mouseup="ToMDirection(i, 'LEFT_UP', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-leftdoown"
                @mousedown="ToMDirection(i, 'LEFT_DOWN', 0)"
                @mouseup="ToMDirection(i, 'LEFT_DOWN', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-rightup"
                @mousedown="ToMDirection(i, 'RIGHT_UP', 0)"
                @mouseup="ToMDirection(i, 'RIGHT_UP', 1)"
              />
              <Icon
                icon="grommet-icons:up"
                class="iconfont cursorPointer iconvideo-arrow-rightdown"
                @mousedown="ToMDirection(i, 'RIGHT_DOWN', 0)"
                @mouseup="ToMDirection(i, 'RIGHT_DOWN', 1)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {
  defineComponent,
  ref,
  unref,
  onMounted,
  reactive,
  nextTick,
} from "vue";
import { BasicModal, useModalInner } from "components/Modal";
import { controlling } from "./api";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();
import { Icon } from "components/Icon";

const title = ref<any>("");
const propsData = ref<any>({});
const videoUrlList = reactive<any>([]);
let isReloading = ref(false);
const [registerModal, { closeModal, setModalProps, changeOkLoading }] =
  useModalInner(async (data: any) => {
    propsData.value = data;
    title.value = data?.title ?? "视频";

    handleCancel();
    handleVideo(data?.list);
  });

const getVideoItemStyle = () => {
  if (videoUrlList?.length > 1) {
    return {
      width: "calc((100% - 6px) / 2)",
      // height: 'calc((100% - 6px) / 2)',
      minWidth: "300px",
      minHeight: "295px",
    };
  } else {
    return {
      width: "100%",
      height: "100%",
    };
  }
};

const ToMDirection = async (item: any, command: any, action: any) => {
  await controlling({
    code: item?.code,
    command,
    action,
  });
};
const loading = ref(true);
const setItemRef = (el: any, index: any) => {
  if (el) {
    videoUrlList[index].itemRef = el;
  }
};
const handleVideo = (list: any) => {
  videoUrlList?.map((v: any) => {
    v?.hls?.destroy();
    v?.port1?.close();
    v?.timeId ? clearInterval(v?.timeId) : null;
    v.isContactSuccessful = false;
    v.itemRef = null;
  });
  videoUrlList.length = 0;
  videoUrlList.push(...(list || []));

  nextTick(() => {
    videoUrlList.map((l: any, ind: any) => {
      if (l?.playMode == "hls" && l?.playAddr) {
        let video: any = document.getElementById(`video${ind}`);
        if (video) {
          video.preload = "none";
          video.muted = true;
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          if (Hls?.isSupported()) {
            l.hls = new Hls({
              // 性能优化
              enableWorker: true,
              lowLatencyMode: true,
              //缓存优化
              backBufferLength: 30, // 增加回退缓冲区至30秒
              maxBufferLength: 45, // 增加最大缓冲区至45秒
              maxMaxBufferLength: 600, // 保持最大缓冲上限
              maxBufferSize: 10000000, //可能导致内存占用过高，尤其是在移动设备或低内存环境。 缓冲设置10MB
              maxBufferHole: 0.2, //降低空洞容忍度至20% 允许较大空洞，可能引发卡顿
              // 错误恢复
              fragLoadingMaxRetry: 5, // 增加重试次数至5次
              fragLoadingRetryDelay: 1000, // 初始重试间隔1秒
              fragLoadingRetryMaxDelay: 5000, // 最大重试间隔5秒
              fragLoadingRetryBackoffFactor: 2, // 指数退避因子
              manifestLoadingMaxRetry: 5, // 优化manifest重试策略
              manifestLoadingRetryDelay: 1000,
              manifestLoadingRetryMaxDelay: 5000,
              manifestLoadingRetryBackoffFactor: 2,
              abr: {
                // ABR优化
                abrEwmaFastLive: 2.0, // 降低快速响应参数
                abrEwmaSlowLive: 7.0, // 降低慢速响应参数
                abrEwmaFastVoD: 1.5, // 优化点播场景参数
                abrEwmaSlowVoD: 5.0, // 点播慢速响应参数
                abrBandWidthFactor: 0.7, // 动态调整带宽因子
                abrMaxQuality: 5, // 限制最大画质
                abrMinQuality: 1, // 保障最低画质
              },
            });
            l.hls.loadSource(l?.playAddr);
            l.hls.attachMedia(video);
            l.hls.on(Hls?.Events?.MANIFEST_PARSED, function () {
              video.play();
            });
            l.hls.on(Hls.Events.ERROR, (event, data) => {
              if (isReloading.value) return; // 防止重复触发

              /*v.hls.attachMedia(video);
            v.hls.stopLoad();
            v.hls.startLoad();*/
              //v.hls.stopLoad();
              if (data.type == Hls.ErrorTypes.MEDIA_ERROR) {
                // 尝试恢复媒体错误
                l.hls.recoverMediaError();
              } else {
                isReloading.value = true;
                //  播放错误，尝试重新加载
                l.hls.detachMedia();
                video.removeAttribute("src");
                video.load();
                l.hls.loadSource(l?.hls?.url);
                l.hls.attachMedia(video);
                video.play().catch((err) => {
                  // 自动播放失败;
                  setTimeout(() => {
                    isReloading.value = false; // 重置状态
                  }, 2000); // 2秒延迟后重置
                });
              }
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = l?.playAddr;
            video.addEventListener("loadedmetadata", function () {
              video.play();
            });
          }
        }
      } else if (l?.playMode == "hkcj" && l?.playAddr) {
        let videoIframe: any = document.getElementById(`videoIframe${ind}`);
        if (videoIframe) {
          videoIframe.onload = () => {
            l.channel = new MessageChannel();
            l.channel.port1.onmessage = listenFromIframe;

            if (!l?.isContactSuccessful) {
              l?.timeId ? clearInterval(l?.timeId) : null;
              l.timeId = setInterval(() => {
                videoIframe?.contentWindow?.postMessage(
                  {
                    type: "init",
                    ind,
                  },
                  "*",
                  [l.channel?.port2],
                );
              }, 500);
            }
          };
        }
      }
    });

    loading.value = false;
  });
};

import { useElementSize } from "@vueuse/core";
const handleVideoIframe = () => {
  videoUrlList.map((l: any, ind: any) => {
    const { width, height } = useElementSize(l.itemRef);
    if (l?.playMode == "hkcj" && l?.playAddr && l?.isContactSuccessful) {
      let videoIframe: any = document.getElementById(`videoIframe${ind}`);
      l?.channel?.port1?.postMessage({
        type: "from-parent-hkvideo-init",
        payload: JSON.stringify({
          ParentSize: {
            // 告诉嵌入的子页面视窗高度与宽度
            width: width.value,
            height: height.value,
          },
          iframeClientPos: {
            // iframe相对视窗的位置
            left: videoIframe.getBoundingClientRect().left,
            right: videoIframe.getBoundingClientRect().right,
            top: videoIframe.getBoundingClientRect().top,
            bottom: videoIframe.getBoundingClientRect().bottom,
          },
          iframeOffset: {
            // iframe偏离文档的位置
            left: videoIframe.offsetLeft,
            top: videoIframe.offsetTop,
          },
        }),
      });
    }
  });
};
const listenFromIframe = (event: any) => {
  if (event?.data?.type == "from-iframe-already") {
    videoUrlList[event?.data?.payload?.ind]?.timeId
      ? clearInterval(videoUrlList[event?.data?.payload?.ind]?.timeId)
      : null;
    videoUrlList[event?.data?.payload?.ind].isContactSuccessful = true;
    handleVideoIframe();
  }
};
const timeId = ref();
const mouseDownDialog = (e: any) => {
  timeId.value ? clearInterval(timeId.value) : null;
  timeId.value = setInterval(() => {
    handleVideoIframe();
  }, 200);
};
const mouseUpDialog = (e: any) => {
  timeId.value ? clearInterval(timeId.value) : null;
  handleVideoIframe();
};
const handleFullScreen = async () => {
  await nextTick(() => {});
  await nextTick(() => {});
  await nextTick(() => {});
  handleVideoIframe();
};

const handleCancel = () => {
  videoUrlList?.map((v: any) => {
    v?.hls?.destroy();
    v?.port1?.close();
    v?.timeId ? clearInterval(v?.timeId) : null;
    v.isContactSuccessful = false;
    v.itemRef = null;
  });
  videoUrlList.length = 0;
  isReloading.value = false;
  timeId.value ? clearInterval(timeId.value) : null;
  timeId.value = null;
};
</script>
<style lang="scss" scoped>
.video-dialog-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  overflow: auto;
  .video-dialog-content-item {
    flex-shrink: 0;
    border: 1px solid rgba(105, 177, 255, 1);
    box-sizing: border-box;
    .video-dialog-content-item-c {
      width: 100%;
      height: 100%;
      position: relative;

      .video-arrow {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        display: none;
        .iconfont {
          pointer-events: auto;
          position: absolute;
          color: rgba(255, 232, 84, 1);
          font-weight: bold;
          font-size: 40px !important;
        }
        .iconvideo-arrow-left {
          left: 20%;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
        }
        .iconvideo-arrow-right {
          right: 20%;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
        }
        .iconvideo-arrow-up {
          left: 50%;
          top: 10%;
          transform: translateX(-50%) rotate(0deg);
        }
        .iconvideo-arrow-down {
          left: 50%;
          bottom: 10%;
          transform: translateX(-50%) rotate(180deg);
        }
        .iconvideo-arrow-leftup {
          left: 20%;
          top: 10%;
          transform: rotate(-45deg);
        }
        .iconvideo-arrow-leftdoown {
          left: 20%;
          bottom: 10%;
          transform: rotate(-135deg);
        }
        .iconvideo-arrow-rightup {
          right: 20%;
          top: 10%;
          transform: rotate(45deg);
        }
        .iconvideo-arrow-rightdown {
          right: 20%;
          bottom: 10%;
          transform: rotate(135deg);
        }
      }
    }
    .video-dialog-content-item-c:hover .video-arrow {
      display: block;
    }
  }
}
</style>
