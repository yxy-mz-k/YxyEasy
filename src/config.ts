import { reactive, readonly } from "vue";
import type { YxyEasyOptions } from "./types";
// import { defaultOptions } from "./types";

export const defaultOptions: YxyEasyOptions = {
  key: "uauth",
};

/**
 * 全局配置对象（响应式）
 */
const config = reactive<YxyEasyOptions>({ ...defaultOptions });

/**
 * 设置配置
 */
export function setConfig(options: Partial<YxyEasyOptions>) {
  Object.assign(config, options);
}

/**
 * 获取配置
 */
export function getConfig(): Readonly<YxyEasyOptions> {
  return readonly(config);
}

/**
 * 获取单个配置项
 */
export function getConfigValue<T extends keyof YxyEasyOptions>(
  key: T,
): YxyEasyOptions[T] {
  return config[key];
}

/**
 * 生成带前缀的 key
 */
export function getStorageKey(key: string): string {
  return `${config.storagePrefix}${key}`;
}

/**
 * 重置配置
 *
 */
export function resetConfig() {
  Object.assign(config, defaultOptions);
}

export default config;
