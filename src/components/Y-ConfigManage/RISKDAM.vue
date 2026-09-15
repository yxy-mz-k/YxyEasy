<template>
  <!-- 应急闸坝地图弹窗 -->
  <CustomDia v-bind="attrs" ref="CustomDiaRef" @close="close">
    <template #title>
      <div class="custom-dam-title">
        <div>{{ currentMapInfo?.name }}</div>
        <div class="title-other">
          <div class="title-other-autostatus">
            {{ infoList?.autoStatus }}
          </div>
          <!-- <Icon
            class="title-icon"
            icon="ph:security-camera-fill"
            v-show="currentMapInfo?.relatedVideos"
            @click="openVideo"
          /> -->
        </div>
      </div>
    </template>
    <div
      class="CustomDia-content"
      :style="{
        '--NullData': `url(${NullData})`,
      }"
    >
      <div class="CustomDia-content-wrapper">
        <div class="DamDia">
          <div class="pop-content">
            <div class="pop-title">
              <div class="textEllipsis pop-com">
                {{ company }}
              </div>
              <div class="pop-title-right">
                <div class="search-input">
                  <el-input
                    placeholder="请输入控制口令"
                    v-model="wordCommandSearch"
                    type="password"
                    show-password
                    :disabled="infoList.autoStatus == '手动' || infoList.autoStatus == '未知'"
                  >
                    <template #suffix>
                      <Icon icon="material-symbols:search" />
                    </template>
                  </el-input>
                </div>
                <el-switch
                  v-model="openStatus"
                  :disabled="
                    openDisabled ||
                    !wordCommandSearch ||
                    infoList.autoStatus == '手动' ||
                    infoList.autoStatus == '未知'
                  "
                  style="--el-switch-on-color: #00f100; --el-switch-off-color: #ff5a5a"
                  inline-prompt
                  :active-value="1"
                  active-text="开"
                  :inactive-value="0"
                  inactive-text="关"
                  @change="setMqttFk"
                />
              </div>
            </div>
            <div class="pop-content" v-if="tableData?.length">
              <div class="pop-content-item" v-for="item in tableData" :key="item.id">
                <div>
                  {{ `${item.createBy}发送` }}
                  <span
                    :class="
                      item.handleOrder?.includes('打开')
                        ? 'descColor'
                        : item.handleOrder?.includes('关闭')
                        ? 'ascColor'
                        : ''
                    "
                    >{{ item.handleOrder }}</span
                  >
                  指令，
                  <span
                    :class="
                      item?.status == '1' ? 'descColor' : item?.status == '0' ? 'ascColor' : ''
                    "
                    >{{ item.status == '1' ? '下发成功' : '下发失败' }}</span
                  >
                </div>
                <div>{{ item.createTime }}</div>
              </div>
            </div>
            <div class="NullDataPic" v-else></div>
          </div>
        </div>
      </div>
    </div>
  </CustomDia>
</template>
<script setup lang="ts" name="componentName">
  import {
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
  import { Icon } from '/@/components/Icon';
  const attrs = useAttrs();

  import NullData from '/@/assets/images/NullData.png';
  import CustomDia from '/@/views/common/CustomDia/index.vue';

  const emits = defineEmits<{
    (e: 'close', k?: any): void;
    (e: 'openVideo', k?: any): void;
  }>();

  // const openVideo = () => {
  //   // dialogComDamRef.value?.closeDialog();
  //   // GbVideoDiaDamRef.value?.closeDialog();
  //   // if (!currentMapInfo.value?.relatedVideos) {
  //   //   createMessage.warning('暂无视频编号');
  //   //   dialogComDamRef.value?.closeDialog();
  //   //   GbVideoDiaDamRef.value?.closeDialog();
  //   //   return;
  //   // }
  //   // if (currentMapInfo.value?.relatedVideos?.includes('_')) {
  //   //   GbVideoDiaDamRef.value?.openDialog();
  //   // } else {
  //   //   const array = currentMapInfo.value?.relatedVideos?.split(',');
  //   //   videoCodeList.length = 0;
  //   //   videoCodeList.push(...array.filter(Boolean));
  //   //   dialogComDamRef.value?.openDialog();
  //   // }
  // };
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { parkGetMonitorNewData, mqttFk, zkDevicesOpLog, getDeviceByCode } from './api';
  import Mitt from '/@/utils/myMitt';

  const infoList: any = ref({
    // title: "",
    autoStatus: '',
  });

  const deviceNo = ref();
  const company = ref();
  const wordCommandSearch = ref('');
  const tableData = reactive<any>([]);
  const openDisabled = ref(false);
  const openStatus = ref(0);

  const setMqttFk = async () => {
    let obj = {};
    openDisabled.value = true;
    const oldStatus = openStatus.value === 1 ? 0 : 1;
    if (openStatus.value === 1) {
      obj = {
        do_0001: 1,
      };
    } else {
      obj = {
        do_0002: 1,
      };
    }
    try {
      let res: any = await mqttFk({
        pwd: wordCommandSearch.value,
        deviceNo: deviceNo.value,
        val: obj,
      });
      openDisabled.value = false;
      createMessage.success(res?.info);

      getZkDevicesOpLogData(deviceNo.value);
    } catch (err: any) {
      openDisabled.value = false;
      openStatus.value = oldStatus;
      createMessage.error(err.message);
    }
  };

  const getZkDevicesOpLogData = async (deviceNo: any) => {
    if (!deviceNo) {
      return;
    }
    tableData.length = 0;
    let res: any = await zkDevicesOpLog({
      deviceNo,
      startTime: '',
      endTime: '',
    });
    tableData.push(...(res || []));
    tableData.map((item: any) => {
      item.info = JSON.parse(item?.info);
      if (item?.info?.val?.['do_0001'] === 1) {
        item.handleOrder = '打开';
      } else if (item?.info?.val?.['do_0002'] === 1) {
        item.handleOrder = '关闭';
      } else {
        item.handleOrder = '';
      }
    });
  };

  const getParkGetMonitorNewDataData = async (deviceNo: any) => {
    if (!deviceNo) {
      return;
    }
    let res: any = await parkGetMonitorNewData({
      deviceNo,
    });
    infoList.value.autoStatus =
      res?.factorValues?.find((i: any) => i.key === 'di_0001')?.rtd === 0
        ? '手动'
        : res?.factorValues?.find((i: any) => i.key === 'di_0001')?.rtd === 1
        ? '自动'
        : '未知';
    openStatus.value =
      res?.factorValues?.find((i: any) => i.key === 'di_0002')?.rtd === 0 &&
      res?.factorValues?.find((i: any) => i.key === 'di_0003')?.rtd === 1
        ? 0
        : res?.factorValues?.find((i: any) => i.key === 'di_0002')?.rtd === 1 &&
          res?.factorValues?.find((i: any) => i.key === 'di_0003')?.rtd === 0
        ? 1
        : 0;
    // emits("getData", {
    //   autoStatus: infoList.value.autoStatus,
    // });
  };

  const getWs = (data: any) => {
    if (data.type == 'MONITOR') {
      if (data.info.deviceNo == deviceNo.value) {
        infoList.value.autoStatus =
          data.info.factorValues['di_0001']?.rtd === 0
            ? '手动'
            : data.info.factorValues['di_0001']?.rtd === 1
            ? '自动'
            : '未知';
        // emits("getData", {
        //   autoStatus: infoList.value.autoStatus,
        // });
      }
    }
  };

  const currentMapInfo = ref<any>({});
  const getDeviceByCodeInfo = async () => {
    let res: any = await getDeviceByCode({
      code: attrs?.code,
    });
    currentMapInfo.value = Object.assign({}, res);
    company.value = currentMapInfo.value?.orgName || '';
    deviceNo.value = currentMapInfo.value?.code || attrs?.code || '';
    wordCommandSearch.value = '';
    getZkDevicesOpLogData(res?.code);
    getParkGetMonitorNewDataData(res?.code);
    Mitt.on('getWs', getWs);
  };
  watch(
    () => attrs?.code,
    (n: any) => {
      if (n) {
        getDeviceByCodeInfo();
      }
    },
  );
  onMounted(() => {
    if (attrs?.code) {
      getDeviceByCodeInfo();
    }
  });

  const close = () => {
    emits('close', (callback?: any) => {
      callback ? callback() : null;
    });
  };

  const CustomDiaRef = ref();
  const openDialog = () => {
    CustomDiaRef.value?.open();
  };
  const closeDialog = () => {
    CustomDiaRef.value?.close();
  };
  defineExpose({
    openDialog,
    closeDialog,
  });
</script>
<style lang="scss" scoped>
  .custom-dam-title {
    display: flex;
    align-items: center;
    columns: white;
    font-size: 18px;
    font-weight: 500;
    column-gap: 18px;

    .title-other {
      height: 100%;
      display: flex;
      align-items: center;
      column-gap: 18px;

      .title-other-autostatus {
        border-radius: 4px;
        border: 1px solid rgba(105, 177, 255, 1);
        padding: 0 8px;
        box-sizing: border-box;
        font-size: 12px;
        color: rgba(105, 177, 255, 1);
      }

      .title-icon {
        font-size: 20px;
        color: rgba(105, 177, 255, 1);
        cursor: pointer;
        transform: rotateY(180deg);
      }
    }
  }

  .CustomDia-content {
    width: 100%;
    height: 100%;
    // padding: 12px 12px 24px 12px;
    box-sizing: border-box;

    .CustomDia-content-wrapper {
      width: 100%;
      height: 100%;

      .DamDia {
        width: 100%;
        height: 100%;
        pointer-events: auto;
        padding: 6px 6px 0 6px;
        box-sizing: border-box;

        // @include ElPopper();
        .pop-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          row-gap: 12px;

          // justify-content: space-between;
          .pop-title {
            height: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: white;

            .pop-title-right {
              display: flex;
              align-items: center;
              column-gap: 12px;
              height: 100%;

              .search-input {
                width: 150px;
                height: 100%;

                :deep(.el-input) {
                  --el-border-radius-base: 6px !important;
                  background-color: rgba(0, 26, 64, 0.4) !important;
                  border-radius: 6px !important;

                  .el-input__wrapper {
                    box-shadow: inset 0 0 10px 0 rgba(75, 139, 216, 0.6) !important;
                    background-color: rgba(0, 26, 64, 0.4) !important;
                    border-radius: 6px !important;

                    .el-input__clear {
                      color: rgba(105, 177, 255, 1);
                    }

                    .el-input__suffix {
                      color: rgba(105, 177, 255, 1);

                      .el-input__suffix-inner {
                        .el-icon {
                          color: rgba(105, 177, 255, 1);

                          .iconfont {
                            color: rgba(105, 177, 255, 1);
                          }
                        }
                      }
                    }
                  }
                }

                .el-input-group--prepend {
                  .el-input__wrapper {
                  }

                  .el-input-group__prepend {
                    background-color: rgba(75, 139, 216, 0.6) !important;
                    color: white;
                    border-radius: 6px 0 0 6px !important;
                    box-shadow: none !important;
                  }
                }

                .el-input-group--append {
                  border-radius: 6px 0 0 6px !important;

                  .el-input__wrapper {
                    border-radius: 6px 0 0 6px !important;
                  }

                  .el-input-group__append {
                    background-color: rgba(75, 139, 216, 0.6) !important;
                    color: white;
                    border-radius: 0 6px 6px 0 !important;
                    box-shadow: none !important;
                  }
                }

                .el-textarea {
                  background-color: rgba(0, 26, 64, 0.4) !important;
                  border-radius: 6px !important;
                }
              }

              :deep(.el-switch) {
                width: 55px;
                height: 100%;
                border-radius: 6px;

                .el-switch__core {
                  width: 100%;
                  height: 100%;

                  .el-switch__inner {
                    .is-text {
                      font-size: 12px;
                      color: #333;
                    }
                  }
                }
              }
            }
          }

          .pop-content {
            flex: 1;
            width: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;

            .pop-content-item {
              font-size: 14px;
              color: rgba(194, 224, 255, 1);
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              height: 45px;
              position: relative;
              flex-shrink: 0;
            }

            .pop-content-item::after {
              content: '';
              width: 100%;
              height: 1px;
              background: linear-gradient(
                to right,
                rgba(105, 177, 255, 0),
                rgba(105, 177, 255, 0.3),
                rgba(105, 177, 255, 0)
              );
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
