import type { GlobEnvConfig } from "types/config";

import { warn } from "utils/log";
import pkg from "../../package.json";

export function getCommonStoragePrefix() {
  return `${globalConfig?.VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

export function getAppEnvConfig() {
  if (!/^[a-zA-Z\_]*$/.test(globalConfig?.VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  return {
    // VITE_GLOB_APP_TITLE,
    // VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME: globalConfig?.VITE_GLOB_APP_SHORT_NAME,
    // VITE_GLOB_API_URL_PREFIX,
    // VITE_GLOB_UPLOAD_URL,
  };
}

/**
 * @description: Development mode
 */
export const devMode = "development";

/**
 * @description: Production mode
 */
export const prodMode = "production";

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
