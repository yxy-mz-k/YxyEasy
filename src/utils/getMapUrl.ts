import { ref } from "vue";
import { getPathAssets } from "utils/index";
export default function (value?: any) {
  // 动态修改主题图片

  // 园区总览
  const parkOverViewBkPic = ref(getPathAssets(`parkOverView.png`));
  // 环境空气
  const ambientAirBkPic = ref(getPathAssets(`ambientAir.png`));
  // 地表水
  const surfaceWaterBkPic = ref(getPathAssets(`surfaceWater.png`));
  // 例行监测清下水
  const routineMonitoringClearWaterBkPic = ref(
    getPathAssets(`routineMonitoringClearWater.png`),
  );
  // 例行监测地下水
  const routineMonitoringUndergroundWaterBkPic = ref(
    getPathAssets(`routineMonitoringUndergroundWater.png`),
  );
  // 例行监测土壤
  const routineMonitoringSoilBkPic = ref(
    getPathAssets(`routineMonitoringSoil.png`),
  );
  // 例行监测声环境
  const routineMonitoringAcousticEnvironmentBkPic = ref(
    getPathAssets(`routineMonitoringAcousticEnvironment.png`),
  );
  // 例行监测河流底泥
  const routineMonitoringRiverSedimentBkPic = ref(
    getPathAssets(`routineMonitoringRiverSediment.png`),
  );
  // 废气
  const exhaustGasBkPic = ref(getPathAssets(`exhaustGas.png`));
  // 例行监测废气有组织排口
  const routineMonitoringExhaustGasBkPic = ref(
    getPathAssets(`routineMonitoringExhaustGas.png`),
  );
  // 废水
  const wasteWaterBkPic = ref(getPathAssets(`wasteWater.png`));
  // 例行监测污水
  const routineMonitoringWasteWaterBkPic = ref(
    getPathAssets(`routineMonitoringWasteWater.png`),
  );
  // 危废
  const hazardousWasteBkPic = ref(getPathAssets(`hazardousWaste.png`));
  // 离线环境空气
  const ambientAirUnLineBkPic = ref(getPathAssets(`ambientAirUnLine.png`));
  // 离线地表水
  const surfaceWaterUnLineBkPic = ref(getPathAssets(`surfaceWaterUnLine.png`));
  // 离线废气
  const exhaustGasUnLineBkPic = ref(getPathAssets(`exhaustGasUnLine.png`));
  // 离线废水
  const wasteWaterUnLineBkPic = ref(getPathAssets(`wasteWaterUnLine.png`));

  // 环境空气优
  const ambientAir1BkPic = ref(getPathAssets(`ambientAir1.png`));
  // 环境空气良
  const ambientAir2BkPic = ref(getPathAssets(`ambientAir2.png`));
  // 环境空气轻度
  const ambientAir3BkPic = ref(getPathAssets(`ambientAir3.png`));
  // 环境空气中度
  const ambientAir4BkPic = ref(getPathAssets(`ambientAir4.png`));
  // 环境空气重度
  const ambientAir5BkPic = ref(getPathAssets(`ambientAir5.png`));
  // 环境空气严重
  const ambientAir6BkPic = ref(getPathAssets(`ambientAir6.png`));

  // 风险单元
  const riskUnitBkPic = ref(getPathAssets(`riskUnit.png`));
  // 应急仓库
  const emergencyWarehouseBkPic = ref(getPathAssets(`emergencyWarehouse.png`));
  // 应急闸坝-在线/开启-大闸
  const emergencyDamBigBkPic = ref(getPathAssets(`emergencyDamBig.png`));
  // 应急闸坝-离线-大闸
  const emergencyDamUnLineBigBkPic = ref(
    getPathAssets(`emergencyDamUnLineBig.png`),
  );
  // 应急闸坝-关闭-大闸
  const emergencyDamCloseBigBkPic = ref(
    getPathAssets(`emergencyDamCloseBig.png`),
  );
  // 应急闸坝-故障-大闸
  const emergencyDamWarnBigBkPic = ref(
    getPathAssets(`emergencyDamWarnBig.png`),
  );
  // 应急闸坝-在线/开启-小闸
  const emergencyDamSmallBkPic = ref(getPathAssets(`emergencyDamSmall.png`));
  // 应急闸坝-离线-小闸
  const emergencyDamUnLineSmallBkPic = ref(
    getPathAssets(`emergencyDamUnLineSmall.png`),
  );
  // 应急闸坝-关闭-小闸
  const emergencyDamCloseSmallBkPic = ref(
    getPathAssets(`emergencyDamCloseSmall.png`),
  );
  // 应急闸坝-故障-小闸
  const emergencyDamWarnSmallBkPic = ref(
    getPathAssets(`emergencyDamWarnSmall.png`),
  );
  // 应急闸坝-在线/开启-总控
  const emergencyDamToTalBkPic = ref(getPathAssets(`emergencyDamToTal.png`));
  // 应急闸坝-离线-总控
  const emergencyDamUnLineToTalBkPic = ref(
    getPathAssets(`emergencyDamUnLineToTal.png`),
  );
  // 应急闸坝-关闭-总控
  const emergencyDamCloseToTalBkPic = ref(
    getPathAssets(`emergencyDamCloseToTal.png`),
  );
  // 应急闸坝-故障-总控
  const emergencyDamWarnToTalBkPic = ref(
    getPathAssets(`emergencyDamWarnToTal.png`),
  );
  // 应急闸坝-在线/开启-水泵
  const emergencyDamWaterPumpBkPic = ref(
    getPathAssets(`emergencyDamWaterPump.png`),
  );
  // 应急闸坝-离线-水泵
  const emergencyDamUnLineWaterPumpBkPic = ref(
    getPathAssets(`emergencyDamUnLineWaterPump.png`),
  );
  // 应急闸坝-关闭-水泵
  const emergencyDamCloseWaterPumpBkPic = ref(
    getPathAssets(`emergencyDamCloseWaterPump.png`),
  );
  // 应急闸坝-故障-水泵
  const emergencyDamWarnWaterPumpBkPic = ref(
    getPathAssets(`emergencyDamWarnWaterPump.png`),
  );
  // 应急设施
  const emergencyFacilityBkPic = ref(getPathAssets(`emergencyFacility.png`));
  // 应急视频
  const emergencyVideoBkPic = ref(getPathAssets(`emergencyVideo.png`));

  // 聚合小
  const polymerizationSmallBkPic = ref(
    getPathAssets(`polymerizationSmall.png`),
  );
  // 聚合大
  const polymerizationBigBkPic = ref(getPathAssets(`polymerizationBig.png`));
  // 聚合中
  const polymerizationMiddleBkPic = ref(
    getPathAssets(`polymerizationMiddle.png`),
  );
  // 风向点位
  const windBkPic = ref(getPathAssets(`wind.png`));

  // 风向点位矢量图
  const arrowBkPic = ref(getPathAssets(`arrow.svg`));

  // 工况-在线
  const emergencyDamHomeBkPic = ref(getPathAssets(`emergencyDamHome.png`));
  // 工况-离线
  const emergencyDamHomeUnLineBkPic = ref(
    getPathAssets(`emergencyDamHomeUnLine.png`),
  );

  return {
    parkOverViewBkPic,
    ambientAirBkPic,
    surfaceWaterBkPic,
    routineMonitoringClearWaterBkPic,
    routineMonitoringUndergroundWaterBkPic,
    routineMonitoringSoilBkPic,
    routineMonitoringAcousticEnvironmentBkPic,
    routineMonitoringRiverSedimentBkPic,
    exhaustGasBkPic,
    routineMonitoringExhaustGasBkPic,
    wasteWaterBkPic,
    routineMonitoringWasteWaterBkPic,
    hazardousWasteBkPic,
    ambientAirUnLineBkPic,
    surfaceWaterUnLineBkPic,
    exhaustGasUnLineBkPic,
    wasteWaterUnLineBkPic,
    ambientAir1BkPic,
    ambientAir2BkPic,
    ambientAir3BkPic,
    ambientAir4BkPic,
    ambientAir5BkPic,
    ambientAir6BkPic,
    riskUnitBkPic,
    emergencyWarehouseBkPic,
    emergencyDamBigBkPic,
    emergencyDamUnLineBigBkPic,
    emergencyDamCloseBigBkPic,
    emergencyDamWarnBigBkPic,
    emergencyDamSmallBkPic,
    emergencyDamUnLineSmallBkPic,
    emergencyDamCloseSmallBkPic,
    emergencyDamWarnSmallBkPic,
    emergencyDamToTalBkPic,
    emergencyDamUnLineToTalBkPic,
    emergencyDamCloseToTalBkPic,
    emergencyDamWarnToTalBkPic,
    emergencyDamWaterPumpBkPic,
    emergencyDamUnLineWaterPumpBkPic,
    emergencyDamCloseWaterPumpBkPic,
    emergencyDamWarnWaterPumpBkPic,
    emergencyFacilityBkPic,
    emergencyVideoBkPic,
    polymerizationSmallBkPic,
    polymerizationBigBkPic,
    polymerizationMiddleBkPic,
    windBkPic,
    arrowBkPic,
    emergencyDamHomeBkPic,
    emergencyDamHomeUnLineBkPic,
  };
}
