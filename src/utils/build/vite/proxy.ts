/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

import { getGlobalConfig } from "../../global";
export function createProxy() {
  const ret: ProxyTargetList = {};
  let globalConfig = getGlobalConfig();
  for (const [prefix, target] of globalConfig?.VITE_PROXY) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
