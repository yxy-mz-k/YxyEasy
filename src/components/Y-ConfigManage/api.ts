import { defHttp } from '/@/utils/http/axios';

enum Api {
  getDeviceByCode = '/ioe/api/device/getDeviceByCode',
  parkGetMonitorNewData = '/ioe/api/monitorData/getMonitorNewData',
  mqttFk = '/ioe/api/fkEgate/mqttFk',
  zkDevicesOpLog = '/ioe/api/fkEgate/logs',
}

export function getDeviceByCode(params: any) {
  return defHttp.post<any>({
    url: Api.getDeviceByCode,
    params: params,
  });
}
export function parkGetMonitorNewData(params: any) {
  return defHttp.post<any>({
    url: Api.parkGetMonitorNewData,
    params: params,
  });
}

export function mqttFk(params: any) {
  return defHttp.post<any>({
    url: Api.mqttFk,
    params: params,
  });
}

export function zkDevicesOpLog(params: any) {
  return defHttp.post<any>({
    url: Api.zkDevicesOpLog,
    params: params,
  });
}
