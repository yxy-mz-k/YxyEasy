import { createLocalStorage, createSessionStorage } from "./storage";
import { Memory } from "./memory";
import { cacheKeys } from "enums/cacheEnum";
import { DEFAULT_CACHE_TIME } from "settings/encryptionSetting";
import { toRaw } from "vue";
import { pick, omit } from "lodash-es";

// interface BasicStore {
//   [TOKEN_KEY]: string | number | null | undefined;
//   [USER_INFO_KEY]: UserInfo;
//   [ROLES_KEY]: string[];
//   [LOCK_INFO_KEY]: LockInfo;
//   [PROJ_CFG_KEY]: ProjectConfig;
//   [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
// }

type LocalStore = any;

type SessionStore = any;

export type BasicKeys = any;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
const localTokenMemory = new Memory(DEFAULT_CACHE_TIME);
function initPersistentMemory() {
  const localCache = ls.get(cacheKeys?.APP_LOCAL_CACHE_KEY);
  const localTokenCache = ls.get(cacheKeys?.APP_LOCAL_CACHETOKEN_KEY);
  const sessionCache = ss.get(cacheKeys?.APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
  localTokenCache && localTokenMemory.resetCache(localTokenCache);
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static getTokenLocal<T>(key: LocalKeys) {
    return localTokenMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(
    key: LocalKeys,
    value: LocalStore[LocalKeys],
    immediate = false,
  ): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(cacheKeys?.APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static setTokenLocal(
    key: LocalKeys,
    value: LocalStore[LocalKeys],
    immediate = false,
  ): void {
    localTokenMemory.set(key, toRaw(value));
    immediate &&
      ls.set(cacheKeys?.APP_LOCAL_CACHETOKEN_KEY, localTokenMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(cacheKeys?.APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(
    key: SessionKeys,
    value: SessionStore[SessionKeys],
    immediate = false,
  ): void {
    sessionMemory.set(key, toRaw(value));
    immediate &&
      ss.set(cacheKeys?.APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate &&
      ss.set(cacheKeys?.APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

window.addEventListener("beforeunload", function () {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(cacheKeys?.APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, cacheKeys?.LOCK_INFO_KEY),
    ...pick(ls.get(cacheKeys?.APP_LOCAL_CACHE_KEY), [
      cacheKeys?.TOKEN_KEY,
      cacheKeys?.USER_INFO_KEY,
      cacheKeys?.LOCK_INFO_KEY,
    ]),
  });
  ss.set(cacheKeys?.APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, cacheKeys?.LOCK_INFO_KEY),
    ...pick(ss.get(cacheKeys?.APP_SESSION_CACHE_KEY), [
      cacheKeys?.TOKEN_KEY,
      cacheKeys?.USER_INFO_KEY,
      cacheKeys?.LOCK_INFO_KEY,
    ]),
  });
});

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (cacheKeys?.APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (cacheKeys?.APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener("storage", storageChange);

initPersistentMemory();
