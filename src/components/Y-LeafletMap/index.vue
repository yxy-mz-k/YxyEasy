<template>
  <div class="LeaflerMap">
    <iframe
      :id="attrs?.mapIframeId ?? 'MapIframeID'"
      :src="attrs?.iframeSrc"
      width="100%"
      height="100%"
      allowfullscreen
      frameborder="0"
      scrolling="auto"
    ></iframe>
  </div>
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
} from "vue";
const attrs: any = useAttrs();
const emits = defineEmits<{
  (e: "close", k?: any): void;
  (e: "success", k?: any, v?: any): void;
  (e: "getMarkAddress", k?: any, v?: any): void;
  (e: "isOk", k?: any): void;
  (e: "clickItem", k?: any): void;
  (e: "clickMap", k?: any): void;
}>();

import { geoLatLonList, geoSaveOrEdit } from "api/sys/geo";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();
import { useUserStore, useUserStoreWithOut } from "store/modules/user";
const userStore: any = useUserStoreWithOut();

const channel = ref<any>(null);
const timeId = ref<any>(null);
const isContactSuccessful = ref(false);
const keyMap = {
  latLon: "marker",
  draw_route: "line",
  boundary: "polygon",
};

const getOSMAddress = (lat: any, lng: any, callback?: any) => {
  const apiKey = "b90bd0171db91e34a43a62b517512466"; // 需申请高德开发者KEY
  fetch(
    `https://restapi.amap.com/v3/geocode/regeo?key=${apiKey}&location=${lng},${lat}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "1") {
        // 从返回数据中拼接中文地址
        callback?.(data.regeocode.formatted_address);
      } else {
        callback?.(null);
      }
    })
    .catch(() => callback?.(null));
};
const onsubmit = async (arr: any) => {
  const row = arr?.find((a: any) => a.currentDrawerType == attrs?.record?.type);
  let leafletLatlon: any = [];
  if (attrs?.group) {
    leafletLatlon.push(
      ...arr?.map((a: any) => a?.leafletLatlon && JSON.parse(a?.leafletLatlon)),
    );
  }
  const params = Object.assign(
    {},
    {
      id: "",
      name: attrs?.record?.memo,
      tableField: attrs?.record?.mapFiled,
      tableName: attrs?.record?.tableName,
      mapType: "1",
      drawType: keyMap[attrs?.record?.mapFiled] || "marker",
      tableId: attrs?.record?.id,
    },

    row?.leafletLatlon
      ? {
          leafletLatlon: attrs?.group
            ? JSON.stringify(leafletLatlon)
            : row?.leafletLatlon,
        }
      : null,
    row?.drawStyle
      ? {
          drawStyle: row?.drawStyle,
        }
      : null,
  );

  if (attrs?.isCancelSubmit) {
    emits(
      "success",
      params,
      Object.assign({}, attrs, {
        saveParams: params,
      }),
    );
    close();
    return;
  }
  let res: any = await geoSaveOrEdit(params);
  if (res) {
    createMessage.success("保存成功！");
    if (attrs?.needChina) {
      if (params.drawType == "marker") {
        const latlng: any = params?.leafletLatlon
          ? JSON.parse(params?.leafletLatlon)
          : null;
        if (latlng) {
          getOSMAddress(latlng.lat, latlng.lng, (address: any) => {
            emits("getMarkAddress", address, attrs);
            emits(
              "success",
              {
                id: res,
                props:
                  attrs?.record?.type == "drawMarker"
                    ? "mapMarkerId"
                    : attrs?.record?.type == "drawCircle"
                    ? "mapCircleId"
                    : attrs?.record?.type == "drawPolyline"
                    ? "mapLineId"
                    : attrs?.record?.type == "drawRectangle"
                    ? "mapRectangleId"
                    : attrs?.record?.type == "drawPolygon"
                    ? "mapPolygonId"
                    : "mapMarkerId",
                mapFiled: attrs?.record?.mapFiled,
              },
              Object.assign({}, attrs, {
                saveParams: params,
              }),
            );
            close();
          });
        }
      }
    } else {
      emits(
        "success",
        {
          id: res,
          props:
            attrs?.record?.type == "drawMarker"
              ? "mapMarkerId"
              : attrs?.record?.type == "drawCircle"
              ? "mapCircleId"
              : attrs?.record?.type == "drawPolyline"
              ? "mapLineId"
              : attrs?.record?.type == "drawRectangle"
              ? "mapRectangleId"
              : attrs?.record?.type == "drawPolygon"
              ? "mapPolygonId"
              : "mapMarkerId",
          mapFiled: attrs?.record?.mapFiled,
        },
        Object.assign({}, attrs, {
          saveParams: params,
        }),
      );
      close();
    }
  }
};
const listenFromIframe = (event: any) => {
  if (event.data == "from-iframe-already") {
    timeId.value ? clearInterval(timeId.value) : null;
    isContactSuccessful.value = true;
    handleMap();

    emits("isOk", true);
  } else if (event.data.type == "from-iframe-map-submit") {
    onsubmit(JSON.parse(event.data.payload));
  } else if (event.data.type == "from-iframe-map-clickItem") {
    emits("clickItem", JSON.parse(event.data.payload));
  } else if (event.data.type == "from-iframe-map-clickMap") {
    emits("clickMap");
  }
};

const setRequest = (Data = null) => {
  Data &&
    Object.keys(Data)?.map((key: any, index: number, arr: any) => {
      channel.value?.port1?.postMessage({
        type: "from-parent-map-setRequest",
        index,
        length: arr.length,
        key,
        payload: JSON.stringify(Data[key]),
      });
    });
};
const setMapInfo = (Data = null) => {
  Data &&
    Object.keys(Data)?.map((key: any, index: number, arr: any) => {
      channel.value?.port1?.postMessage({
        type: "from-parent-map-setMapInfo",
        index,
        length: arr.length,
        key,
        payload: JSON.stringify(Data[key]),
      });
    });
};
const setCenter = (center: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setCenter",
    payload: center,
  });
};
const setViewCenter = (center: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setViewCenter",
    payload: center,
  });
};
const setMultiple = (multiple: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setMultiple",
    payload: multiple,
  });
};
const setDrawerType = (type) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setDrawerType",
    payload: type,
  });
};
const setDrawerGroup = (bool: boolean) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setDrawerGroup",
    payload: bool,
  });
};
const setQuery = (str: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-setQuery",
    payload: str,
  });
};
const setMapData = (Data = []) => {
  Object.keys(Data)?.map((key: any, index: number, arr: any) => {
    channel.value?.port1?.postMessage({
      type: "from-parent-map-setMap",
      index,
      length: arr.length,
      key,
      payload: JSON.stringify(Data[key]),
    });
  });
};
const setMarkerData = (Data = []) => {
  Object.keys(Data)?.map((key: any, index: number, arr: any) => {
    channel.value?.port1?.postMessage({
      type: "from-parent-map-setMarker",
      index,
      length: arr.length,
      key,
      payload: JSON.stringify(Data[key]),
    });
  });
};
const clearLayers = () => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-clearLayers",
  });
};

const showSubmit = () => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-showSubmit",
  });
};
const hideSubmit = () => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-hideSubmit",
  });
};

const showMarkerByIcon = (icon?: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-showMarkerByIcon",
    payload: icon,
  });
};
const hideMarkerByIcon = (icon?: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-hideMarkerByIcon",
    payload: icon,
  });
};

const showMarkerTitleById = (id?: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-showMarkerTitleById",
    payload: id,
  });
};
const hiddenMarkerTitleById = (id?: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-hiddenMarkerTitleById",
    payload: id,
  });
};

const showMarkerTitleHiddenOtherById = (id?: any) => {
  channel.value?.port1?.postMessage({
    type: "from-parent-map-showMarkerTitleHiddenOtherById",
    payload: id,
  });
};

const handleMap = async () => {
  let requestInfo: any = Object.assign(
    {},
    {
      token: userStore.getToken,
      baseURL: attrs?.origin,
    },
  );
  setRequest(requestInfo);
  setMapInfo(attrs?.record);
  setMultiple(attrs?.multiple ?? false);
  setCenter([31.66648, 120.472424]);
  setDrawerType(attrs?.record?.type);
  setDrawerGroup(attrs?.group ?? false);
  setQuery(userStore?.getUserInfo?.orgName);
  if (attrs?.isInitHideSave) {
    hideSubmit();
  }

  let res: any = await geoLatLonList({
    tableName: attrs?.record?.tableName,
    tableId: attrs?.record?.id,
    tableField: attrs?.record?.mapFiled,
  });
  const data: any = [];
  res?.map((r: any) => {
    if (r?.leafletLatlon) {
      data.push(
        Object.assign(
          {},
          {
            [r.drawType]: Object.assign(
              {},
              r,
              {
                latLng: r?.leafletLatlon,
                memoProp: attrs?.memoProp ?? "name",
              },
              r?.drawStyle
                ? {
                    style: r?.drawStyle,
                  }
                : null,
            ),
          },
        ),
      );
    }
  });
  setMapData(data);
};
watch(
  [isContactSuccessful, () => attrs?.iframeSrc],
  (n: any) => {
    if (!n[0] && n[1]) {
      nextTick(() => {
        const iframe: any = document.getElementById(
          attrs?.mapIframeId ?? "MapIframeID",
        );
        if (iframe) {
          iframe.onload = () => {
            channel.value = new MessageChannel();
            channel.value.port1.onmessage = listenFromIframe;
            if (!isContactSuccessful.value) {
              timeId.value ? clearInterval(timeId.value) : null;
              timeId.value = setInterval(() => {
                iframe.contentWindow.postMessage("init", "*", [
                  channel.value?.port2,
                ]);
              }, 500);
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

const close = () => {
  if (!attrs?.isLongConnection) {
    channel.value?.port1?.close();
    isContactSuccessful.value = false;
    channel.value = null;
  }

  timeId.value ? clearInterval(timeId.value) : null;
  emits("close");
};

defineExpose({
  setRequest,
  setCenter,
  setViewCenter,
  setMultiple,
  setDrawerType,
  setQuery,
  setMapData,
  setMarkerData,
  clearLayers,
  showSubmit,
  hideSubmit,
  showMarkerByIcon,
  hideMarkerByIcon,
  showMarkerTitleById,
  hiddenMarkerTitleById,
  showMarkerTitleHiddenOtherById,
});

onUnmounted(() => {
  close();
  clearLayers();
});
</script>
<style lang="scss" scoped>
.LeaflerMap {
  width: 100%;
  height: 100%;
}
</style>
