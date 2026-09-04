import { createApp, h, onMounted, onUnmounted } from 'vue';
import * as Cesium from 'cesium';
import { throttle } from 'lodash';
import ElementPlus from 'element-plus';
import Antd from 'ant-design-vue';

/**
 * 点位点击，开窗
 */
export default class OpenWin {
  private viewer: Cesium.Viewer;
  private position: Cesium.Cartesian3;
  private vmInstance: any;
  private div: HTMLElement;
  public static singineWin: OpenWin | null;
  private throttledPostRender: () => void;

  constructor(single: boolean, viewer: Cesium.Viewer, Label: any, position: any, props: any) {
    if (document.getElementById(props.id)) {
      //判断当前id窗口已存在
      return;
    }

    if (single) {
      //只有一个弹窗，关闭上一个窗口
      if (OpenWin.singineWin) {
        OpenWin.singineWin.windowClose();
        OpenWin.singineWin = null;
      }
    }

    this.viewer = viewer;
    // let pickPosition = this.viewer.scene.pickPosition(position);
    // let cartographic = undefined;
    // if (pickPosition) {
    //   cartographic = Cesium.Cartographic.fromCartesian(pickPosition);
    // }
    // let longitude = Cesium.Math.toDegrees(cartographic.longitude);
    // let latitude = Cesium.Math.toDegrees(cartographic.latitude);
    this.position = Cesium.Cartesian3.fromDegrees(position?.longitude, position?.latitude, 100);
    this.div = document.createElement('div');
    this.div.setAttribute('id', props.id);
    this.div.style.position = 'absolute';
    // 创建 Vue 应用实例并挂载到这个 DOM 元素上
    props.CWin = this;
    const app = createApp({
      render: () => h(Label, props),
    });
    this.vmInstance = app.use(Antd).mount(this.div);
    // 将 Vue 实例挂载到 Cesium 的容器中
    this.viewer.cesiumWidget.container.appendChild(this.div);
    // 创建节流函数
    this.throttledPostRender = throttle(this.updateBillboardLocation.bind(this), 50); // 100ms 节流
    // 添加场景事件
    this.viewer.scene.postRender.addEventListener(this.updateBillboardLocation, this);
    if (single) {
      //只有一个弹窗，关闭上一个窗口
      OpenWin.singineWin = this;
    }
  }

  private positionX: any;
  private positionY: any;
  private canvasHeight: any;
  private canvasWidth: any;
  updateBillboardLocation() {
    this.canvasHeight = this.viewer.scene.canvas.height;
    this.canvasWidth = this.viewer.scene.canvas.width;
    const windowPosition = new Cesium.Cartesian3();
    Cesium.SceneTransforms.worldToWindowCoordinates(
      this.viewer.scene,
      this.position,
      windowPosition,
    );
    if (this.positionX == windowPosition.x && this.positionY == windowPosition.y) {
      return;
    }
    this.positionX = windowPosition.x;
    this.positionY = windowPosition.y;
    this.div.style.top = windowPosition.y - 220 + 'px';
    //this.element.style.left = windowPosition.x - elWidth / 20 + "px";
    if (this.vmInstance) {
      const elWidth = this.vmInstance?.offsetWidth;
      this.div.style.left = windowPosition.x + 20 + 'px';
    }
  }

  // 关闭
  windowClose(callback?: any) {
    let parent = this.div?.parentElement;
    parent?.removeChild(this.div);
    // this.viewer.scene.postRender.removeEventListener(this.throttledPostRender, this); // 移除事件监听
    this.viewer?.scene?.postRender?.removeEventListener(this.updateBillboardLocation, this);
    if (parent) {
      callback ? callback() : null;
    }
  }
}
