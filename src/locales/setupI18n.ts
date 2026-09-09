// src/locales/setupI18n.ts
import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { setHtmlPageLang, setLoadLocalePool } from "./helper";
import { localeSetting } from "settings/localeSetting";
import { useLocaleStoreWithOut } from "store/modules/locale";

const { fallback, availableLocales } = localeSetting;

// 使用 let 存储实例
let i18nInstance: any = null;

// 获取 i18n 实例
export function getI18n(): ReturnType<typeof createI18n> {
  if (!i18nInstance) {
    // 创建一个临时的 i18n 实例
    i18nInstance = createI18n({
      legacy: false,
      locale: "zh_CN",
      fallbackLocale: fallback,
      messages: {},
      sync: true,
      silentTranslationWarn: true,
      missingWarn: false,
      silentFallbackWarn: true,
    });
  }
  return i18nInstance;
}

// 为了兼容，导出 i18n（使用 getter）
export const i18n = new Proxy({} as ReturnType<typeof createI18n>, {
  get(target, prop) {
    const instance = getI18n();
    return (instance as any)[prop];
  },
  set(target, prop, value) {
    const instance = getI18n();
    (instance as any)[prop] = value;
    return true;
  },
});

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18nInstance = createI18n(options) as I18n;
  app.use(i18nInstance);
  return i18nInstance;
}
